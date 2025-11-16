import { model, Model, Schema } from "mongoose";
const orderSchema = new Schema({
    userId: { type: String, required: true },
    total_amount: { type: Number, required: true },
    payment_status: {
        type: String,
        enum: ["Pending", "Paid", "Failed", "Refunded"],
        default: "Pending",
    },
    delivery_status: {
        type: String,
        enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
        default: "Pending",
    },
}, { timestamps: true });
export const Order = model("Order", orderSchema);
//# sourceMappingURL=order.js.map