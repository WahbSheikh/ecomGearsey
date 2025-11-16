import { Model } from "mongoose";
interface IReview {
    listingId: string;
    userId: string;
    partId: string;
    rating: 0 | 1 | 2 | 3 | 4 | 5;
    comment: string;
}
export declare const Review: Model<IReview>;
export {};
//# sourceMappingURL=review.d.ts.map