import { ObjectId } from "mongodb";
import { z } from "zod";
import { userSchema } from "../users/user.schema";

export const bakerySchema = z.object({
    id: z.string().refine((val) => ObjectId.isValid(val)),
    name: z.string().min(1, 'Name is required').max(255, 'Name cannot exceed 255 characters'),
    address: z.string().min(1, 'Address is required'),
    owner: userSchema,
    createdAt: z.string().transform((str) => new Date(str)),
    updatedAt: z.string().transform((str) => new Date(str))
})