import { type Request, type Response } from "express";
export declare function getAuctions(req: Request, res: Response): Promise<void>;
export declare function updateAuction(req: Request, res: Response): Promise<void>;
export declare function deleteAuction(req: Request, res: Response): Promise<void>;
export declare function closeAuction(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function cancelAuction(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=auction-controller.d.ts.map