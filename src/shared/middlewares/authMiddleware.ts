import { verifyJWTToken } from "@/shared/utils/verifyToken";
import { NextFunction, Request, Response } from "express";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    const token = authHeader?.split(" ")[1]

    if(!token){
       res.status(401).json({ error: "Unauthorized" });
    }

    try{
        if(token){
            const verifiedToken = await verifyJWTToken(token)
            const payload = verifiedToken?.payload
            req.user = payload
        }
    } catch (error) {
        res.status(401).json({ error: "Unauthorized" });
    }
    
    next()

}