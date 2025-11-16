import { model, Schema } from "mongoose";
const auctionSchema = new Schema({
    partId: { type: String, required: true },
    start_price: { type: Number, required: true },
    current_price: { type: Number, required: true },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
    status: { type: String, enum: ['Active', 'Closed', 'Cancelled'], required: true },
    winnerId: { type: String, required: false },
});
export const Auction = model('Auction', auctionSchema);
//# sourceMappingURL=auction.js.map