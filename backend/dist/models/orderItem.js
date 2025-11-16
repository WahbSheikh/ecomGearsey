import { Model, model, Schema } from "mongoose";
const orderItemSchema = new Schema({
    orderId: { type: String, required: true },
    partId: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
}, { timestamps: true });
export const OrderItem = model("OrderItem", orderItemSchema);
//# sourceMappingURL=orderItem.js.map