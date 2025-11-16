import { Model } from "mongoose";
export interface IBid {
    auctionId: string;
    userId: string;
    bid_amount: number;
}
export declare const Bid: Model<IBid>;
//# sourceMappingURL=bid.d.ts.map