import { model, Model, Schema } from "mongoose";
import { ObjectId } from "mongodb";

export interface IListing {
  name: string;
  description: string;
  price: number;
  imageId: ObjectId | string; // Allow both ObjectId and string for temporary URL handling
  sellerId: ObjectId;
  categoryId: ObjectId;
  condition: "New" | "Used" | "Refurbished";
  is_auction: boolean;
  status: "Active" | "Sold" | "Removed";
}

const ListingSchema = new Schema<IListing>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageId: { type: Schema.Types.Mixed, required: true }, // Changed to Mixed to handle URLs temporarily
  sellerId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
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

export const Listing: Model<IListing> = model<IListing>("Listing", ListingSchema);
