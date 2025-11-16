import { Model } from "mongoose";
export interface IOrderItem {
    orderId: string;
    partId: string;
    quantity: number;
    price: number;
}
export declare const OrderItem: Model<IOrderItem>;
//# sourceMappingURL=orderItem.d.ts.map