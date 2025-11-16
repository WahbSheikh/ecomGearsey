import { type Request, type Response } from "express";
export declare function getAllReviews(req: Request, res: Response): Promise<void>;
export declare function getProductReviews(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function getUserReviews(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function createReview(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function deleteReview(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=review-controller.d.ts.map