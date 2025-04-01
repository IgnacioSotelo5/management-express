import { ObjectId } from "mongodb";
import { z } from "zod";

export const paramsSchema = z.object({
    id: z.string().refine((val)=> ObjectId.isValid(val), {message: 'Invalid ObjectId format'})
})