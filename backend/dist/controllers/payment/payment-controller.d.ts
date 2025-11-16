import { type Request, type Response } from "express";
export declare function getPaymentDetails(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function createPayment(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function processPayment(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function refundPayment(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function listTransactions(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=payment-controller.d.ts.map