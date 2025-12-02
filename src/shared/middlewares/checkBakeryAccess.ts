import { NextFunction, Request, Response } from "express";
import { getUserBakeryId } from "../utils/getUserBakeryId";

export const checkBakeryAccess = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId } = req.user;
        const userBakeryId = await getUserBakeryId(userId)

        if(!userBakeryId) {
            return res.status(403).json({ error: "No bakery access found for this user" });
        }

        req.user.bakeryId = userBakeryId;

        next();
    } catch (error) {
        res.status(500).json({ error: "Error checking bakery access" });
    }
}