import { ObjectId } from "mongodb";
import { z } from "zod";

export const idParamSchema = z.object({
    id: z.string().refine((val)=> ObjectId.isValid(val), {message: 'Invalid ObjectId format'})
})

export const nameParamSchema = z.object({
    name: z.string().min(1, 'Name must be provided as param.')
})