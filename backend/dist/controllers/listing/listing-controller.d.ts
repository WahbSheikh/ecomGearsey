import { type Request, type Response } from "express";
export declare function getProducts(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function createProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function updateProductStatus(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function updateProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function deleteProduct(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
export declare function getProductById(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=listing-controller.d.ts.map