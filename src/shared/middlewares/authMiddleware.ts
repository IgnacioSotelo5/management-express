import { verifyJWTToken } from "@/shared/utils/verifyToken";
import { NextFunction, Request, Response } from "express";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    const token = authHeader?.split(" ")[1]

    if(!token){
       res.status(401).json({ error: "Unauthorized" });
       return
    }

    try{
        if(token){
            const verifiedToken = await verifyJWTToken(token)
            if(!verifiedToken){
                res.status(401).json({error: "Invalid token"})
                return
            }
            
            const payload = verifiedToken?.payload
            req.user = payload
            next()
        }
    } catch (error) {
        res.status(401).json({ error: "Unauthorized" });
        return
    }

}