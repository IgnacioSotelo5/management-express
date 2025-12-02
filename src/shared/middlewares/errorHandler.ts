import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/app.error";

export const errorHandler = (e: any, req: Request, res: Response, next: NextFunction) => {    
    if(e instanceof AppError){
        res.status(e.status).json({message: e.message})
    } else {
        res.status(500).json({message: "Internal server error"})
    }
}