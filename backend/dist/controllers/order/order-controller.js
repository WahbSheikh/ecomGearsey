import { Order } from "@/models/order.js";
import { OrderItem } from "@/models/orderItem.js";
import { Listing } from "@/models/listing.js";
import {} from "express";
export async function getAllOrders(req, res) {
    try {
        const { limit } = req.query;
        const orders = await Order.find()
            .limit(Number(limit) || 10)
            .sort({ createdAt: -1 });
        res.status(200).json({
            message: "All orders fetched successfully",
            orders,
        });
    }
    catch (error) {
        console.error("Error fetching all orders:", error);
        res.status(400).json({
            message: "Failed to fetch all orders",
            error: error.message,
        });
    }
}
export async function getUserOrders(req, res) {
    try {
        const { userId } = req.params;
        const { limit } = req.query;
        if (!userId) {
            res.status(403).json({ message: "Missing userId in request params" });
            return;
        }
        const orders = await Order.find({ userId })
            .limit(Number(limit) || 10)
            .sort({ createdAt: -1 });
        res.status(200).json({
            message: "Orders fetched successfully",
            orders,
        });
    }
    catch (error) {
        console.error("Error fetching orders:", error);
        res.status(400).json({
            message: "Failed to fetch orders",
            error: error.message,
        });
    }
}
export async function getUserOrderItems(req, res) {
    try {
        const { userId, orderId } = req.params;
        if (!userId || !orderId) {
            res.status(403).json({ message: "Missing userId or orderId in request params" });
            return;
        }
        const order = await Order.findOne({ _id: orderId, userId });
        const orderItems = await OrderItem.find({ orderId });
        res.status(200).json({
            message: "Order items fetched successfully",
            order,
            items: orderItems,
        });
    }
    catch (error) {
        console.error("Error fetching order items:", error);
        res.status(400).json({
            message: "Failed to fetch order items",
            error: error.message,
        });
    }
}
export async function createOrder(req, res) {
    try {
        const { userId, total_amount, items } = req.body;
        console.log("📦 Received order creation request:");
        console.log("  - userId:", userId);
        console.log("  - total_amount:", total_amount);
        console.log("  - items:", items);
        if (!userId || !total_amount || !items || items.length === 0) {
            res.status(400).json({
                message: "Missing required fields: userId, total_amount, items",
            });
            return;
        }
        // ✅ Check product availability BEFORE creating order
        for (const item of items) {
            const product = await Listing.findById(item.partId);
            if (!product) {
                res.status(404).json({
                    message: `Product ${item.partId} not found`,
                });
                return;
            }
            if (product.status === "Sold") {
                res.status(400).json({
                    message: `Product "${product.name}" is already sold`,
                });
                return;
            }
            if (product.status === "Removed") {
                res.status(400).json({
                    message: `Product "${product.name}" is no longer available`,
                });
                return;
            }
        }
        // Create the order with Pending status
        const orderResult = await Order.create({
            userId,
            total_amount,
            payment_status: "Pending",
            delivery_status: "Pending",
        });
        console.log("✅ Order created:", orderResult);
        const orderId = orderResult._id.toString();
        // Add orderId to each item before inserting
        const itemsWithOrderId = items.map(item => ({
            orderId: orderId,
            partId: item.partId,
            quantity: item.quantity,
            price: item.price,
        }));
        console.log("📦 Creating order items with orderId:", itemsWithOrderId);
        // Insert order items
        const orderItems = await OrderItem.insertMany(itemsWithOrderId);
        console.log("✅ Order items created:", orderItems.length, "items");
        // ❌ DO NOT mark as sold here - only when payment is confirmed!
        console.log("⏳ Products remain Active until payment is confirmed");
        res.status(201).json({
            message: "Order created successfully",
            order: {
                acknowledged: true,
                insertedId: orderId
            },
            orderItems: {
                acknowledged: true,
                insertedCount: orderItems.length,
                insertedIds: orderItems.reduce((acc, item, index) => {
                    acc[index.toString()] = item._id;
                    return acc;
                }, {})
            }
        });
    }
    catch (error) {
        console.error("❌ Error creating order:", error);
        res.status(400).json({
            message: "Failed to create order",
            error: error.message,
        });
    }
}
export async function confirmOrder(req, res) {
    try {
        const { userId, orderId } = req.body;
        if (!userId || !orderId) {
            res.status(403).json({ message: "Missing userId or orderId in request body" });
            return;
        }
        const updatedOrder = await Order.updateOne({ _id: orderId, userId }, { $set: { payment_status: "Paid", delivery_status: "Shipped" } });
        if (!updatedOrder.matchedCount) {
            res.status(404).json({ message: "Order not found or could not be updated" });
            return;
        }
        // ✅ NOW mark products as Sold when payment is confirmed
        const orderItems = await OrderItem.find({ orderId });
        for (const item of orderItems) {
            try {
                const updateResult = await Listing.findByIdAndUpdate(item.partId, {
                    status: "Sold",
                    $set: { updatedAt: new Date() }
                }, { new: true });
                if (updateResult) {
                    console.log(`✅ Product ${item.partId} marked as SOLD (payment confirmed): "${updateResult.name}"`);
                }
            }
            catch (productError) {
                console.error(`⚠️ Failed to update product ${item.partId}:`, productError);
            }
        }
        res.status(200).json({
            message: "Order confirmed and products marked as sold",
            updatedOrder
        });
    }
    catch (error) {
        console.error("Error confirming order:", error);
        res.status(400).json({
            message: "Failed to confirm order",
            error: error.message,
        });
    }
}
export async function cancelOrder(req, res) {
    try {
        const { userId, orderId } = req.body;
        if (!userId || !orderId) {
            res.status(403).json({ message: "Missing userId or orderId in request body" });
            return;
        }
        // Get order to check if it was paid
        const order = await Order.findOne({ _id: orderId, userId });
        if (!order) {
            res.status(404).json({ message: "Order not found" });
            return;
        }
        // Get order items
        const orderItems = await OrderItem.find({ orderId });
        const updatedOrder = await Order.updateOne({ _id: orderId, userId }, { $set: { payment_status: "Refunded", delivery_status: "Cancelled" } });
        if (!updatedOrder.matchedCount) {
            res.status(404).json({ message: "Order not found or could not be updated" });
            return;
        }
        // ✅ Only restore products if order was Paid (meaning products were marked as Sold)
        if (order.payment_status === "Paid") {
            for (const item of orderItems) {
                try {
                    const updateResult = await Listing.findByIdAndUpdate(item.partId, {
                        status: "Active",
                        $set: { updatedAt: new Date() }
                    }, { new: true });
                    if (updateResult) {
                        console.log(`✅ Product ${item.partId} restored to ACTIVE: "${updateResult.name}"`);
                    }
                }
                catch (productError) {
                    console.error(`⚠️ Failed to restore product ${item.partId}:`, productError);
                }
            }
        }
        else {
            console.log("ℹ️ Order was not paid, products remain Active");
        }
        res.status(200).json({
            message: "Order cancelled successfully",
            updatedOrder
        });
    }
    catch (error) {
        console.error("Error cancelling order:", error);
        res.status(400).json({
            message: "Failed to cancel order",
            error: error.message,
        });
    }
}
export async function deleteOrder(req, res) {
    try {
        const { userId, orderId } = req.body;
        if (!userId || !orderId) {
            res.status(403).json({ message: "Missing userId or orderId in request body" });
            return;
        }
        // Get order to check if it was paid
        const order = await Order.findOne({ _id: orderId, userId });
        if (!order) {
            res.status(404).json({ message: "Order not found" });
            return;
        }
        // Get order items BEFORE deleting
        const orderItems = await OrderItem.find({ orderId });
        // Delete order items first (cascade delete)
        await OrderItem.deleteMany({ orderId });
        // Then delete the order
        const deletedOrder = await Order.deleteOne({ _id: orderId, userId });
        if (!deletedOrder.deletedCount) {
            res.status(404).json({ message: "Order not found or could not be deleted" });
            return;
        }
        // ✅ Only restore products if order was Paid
        if (order.payment_status === "Paid") {
            for (const item of orderItems) {
                try {
                    const updateResult = await Listing.findByIdAndUpdate(item.partId, {
                        status: "Active",
                        $set: { updatedAt: new Date() }
                    }, { new: true });
                    if (updateResult) {
                        console.log(`✅ Product ${item.partId} restored to ACTIVE after order deletion: "${updateResult.name}"`);
                    }
                }
                catch (productError) {
                    console.error(`⚠️ Failed to restore product ${item.partId}:`, productError);
                }
            }
        }
        res.status(200).json({
            message: "Order deleted successfully"
        });
    }
    catch (error) {
        console.error("Error deleting order:", error);
        res.status(400).json({
            message: "Failed to delete order",
            error: error.message,
        });
    }
}
export async function updateOrderStatus(req, res) {
    try {
        const { orderId, delivery_status, payment_status } = req.body;
        if (!orderId) {
            res.status(400).json({ message: "Missing orderId in request body" });
            return;
        }
        const updateData = {};
        if (delivery_status)
            updateData.delivery_status = delivery_status;
        if (payment_status)
            updateData.payment_status = payment_status;
        const updatedOrder = await Order.findByIdAndUpdate(orderId, { $set: updateData }, { new: true });
        if (!updatedOrder) {
            res.status(404).json({ message: "Order not found" });
            return;
        }
        res.status(200).json({
            message: "Order status updated successfully",
            order: updatedOrder,
        });
    }
    catch (error) {
        console.error("Error updating order status:", error);
        res.status(400).json({
            message: "Failed to update order status",
            error: error.message,
        });
    }
}
//# sourceMappingURL=order-controller.js.map