import { model, Model, Schema } from "mongoose";
import { ObjectId } from "mongodb";
const ListingSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageId: { type: Schema.Types.Mixed, required: true }, // Changed to Mixed to handle URLs temporarily
    sellerId: { type: Schema.Types.ObjectId, required: true },
    categoryId: { type: Schema.Types.ObjectId, required: true, ref: 'Category' },
    condition: {
        type: String,
        enum: ["New", "Used", "Refurbished"],
        required: true,
    },
    is_auction: { type: Boolean, required: true },
    status: {
        type: String,
        enum: ["Active", "Sold", "Removed"],
        default: "Active",
        required: true,
    },
}, { timestamps: true });
ListingSchema.index({ name: "text", description: "text" });
export const Listing = model("Listing", ListingSchema);
//# sourceMappingURL=listing.js.map