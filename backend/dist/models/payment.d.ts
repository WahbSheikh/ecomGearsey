import { Model } from "mongoose";
export interface IPayment {
    orderId: string;
    payment_method: "Credit Card" | "Debit Card" | "Cash On Delivery" | "EasyPaisa" | "Bank Transfer";
    amount: number;
    status: "Pending" | "Completed" | "Failed" | "Refunded";
}
export declare const Payment: Model<IPayment>;
//# sourceMappingURL=payment.d.ts.map