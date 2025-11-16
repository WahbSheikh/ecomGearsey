import { Model } from "mongoose";
export interface IOrder {
    userId: string;
    total_amount: number;
    payment_status: "Pending" | "Paid" | "Failed" | "Refunded";
    delivery_status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
}
export declare const Order: Model<IOrder>;
//# sourceMappingURL=order.d.ts.map