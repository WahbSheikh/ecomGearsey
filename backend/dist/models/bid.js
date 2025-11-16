import { model, Model, Schema } from "mongoose";
const bidSchema = new Schema({
    auctionId: { type: String, required: true },
    userId: { type: String, required: true },
    bid_amount: { type: Number, required: true },
}, { timestamps: true });
export const Bid = model('Bid', bidSchema);
//# sourceMappingURL=bid.js.map