import { Model, model, Schema } from "mongoose";
const paymentSchema = new Schema({
    orderId: { type: String, required: true },
    payment_method: {
        type: String,
        enum: [
            "Credit Card",
            "Debit Card",
            "Cash On Delivery",
            "EasyPaisa",
            "Bank Transfer",
        ],
        required: true,
    },
    amount: { type: Number, required: true },
    status: {
        type: String,
        enum: ["Pending", "Completed", "Failed", "Refunded"],
        default: "Pending",
    },
}, { timestamps: true });
export const Payment = model("Payment", paymentSchema);
//# sourceMappingURL=payment.js.map