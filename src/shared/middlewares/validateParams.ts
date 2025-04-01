import { RequestHandler } from "express";
import { ZodSchema } from "zod";

export const validateParams = (schema: ZodSchema): RequestHandler => 
(req, res, next) => {
    const params = req.params;    

    const result = schema.safeParse(params);
    
    if (!result.success) {
        res.status(400).json({ error: result.error.format() });
        return 
    }

    req.params = result.data;

    next();
};
