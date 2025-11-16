import { Model } from "mongoose";
import { ObjectId } from "mongodb";
export interface IListing {
    name: string;
    description: string;
    price: number;
    imageId: ObjectId | string;
    sellerId: ObjectId;
    categoryId: ObjectId;
    condition: "New" | "Used" | "Refurbished";
    is_auction: boolean;
    status: "Active" | "Sold" | "Removed";
}
export declare const Listing: Model<IListing>;
//# sourceMappingURL=listing.d.ts.map