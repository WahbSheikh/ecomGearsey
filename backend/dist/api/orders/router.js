import express from "express";
import { createOrder, confirmOrder, cancelOrder, deleteOrder, getUserOrders, getAllOrders, getUserOrderItems, updateOrderStatus, // Add this
 } from "@/controllers/order/order-controller.js";
const router = express.Router();
router.get("/", getAllOrders);
router.get("/:userId", getUserOrders);
router.get("/:userId/:orderId", getUserOrderItems);
router.post("/", createOrder);
router.delete("/", deleteOrder);
router.put("/confirm", confirmOrder);
router.put("/cancel", cancelOrder);
router.put("/update-status", updateOrderStatus); // Add this
export default router;
//# sourceMappingURL=router.js.map