export interface IAuction {
    partId: string;
    start_price: number;
    current_price: number;
    start_time: Date;
    end_time: Date;
    status: 'Active' | 'Closed' | 'Cancelled';
    winnerId: string;
}
export declare const Auction: import("mongoose").Model<IAuction, {}, {}, {}, import("mongoose").Document<unknown, {}, IAuction, {}, {}> & IAuction & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>;
//# sourceMappingURL=auction.d.ts.map