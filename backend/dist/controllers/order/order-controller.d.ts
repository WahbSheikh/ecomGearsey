import { type Request, type Response } from "express";
export declare function getAllOrders(req: Request, res: Response): Promise<void>;
export declare function getUserOrders(req: Request, res: Response): Promise<void>;
export declare function getUserOrderItems(req: Request, res: Response): Promise<void>;
export declare function createOrder(req: Request, res: Response): Promise<void>;
export declare function confirmOrder(req: Request, res: Response): Promise<void>;
export declare function cancelOrder(req: Request, res: Response): Promise<void>;
export declare function deleteOrder(req: Request, res: Response): Promise<void>;
export declare function updateOrderStatus(req: Request, res: Response): Promise<void>;
//# sourceMappingURL=order-controller.d.ts.map