import { model, Model, Schema } from "mongoose";
const ReviewSchema = new Schema({
    listingId: { type: String, required: true },
    userId: { type: String, required: true },
    partId: { type: String, required: true },
    rating: {
        type: Number,
        enum: [0, 1, 2, 3, 4, 5],
        required: true,
    },
    comment: { type: String, required: true },
}, { timestamps: true });
export const Review = model("Review", ReviewSchema);
//# sourceMappingURL=review.js.map