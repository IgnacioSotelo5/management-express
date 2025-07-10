import { ObjectId } from "mongodb";
import { z } from "zod";
import { userSchema } from "../users/user.schema";

export const bakerySchema = z.object({
    id: z.string().refine((val) => ObjectId.isValid(val)).optional(),
    name: z.string().min(1, 'Name is required').max(255, 'Name cannot exceed 255 characters'),
    address: z.string().min(1, 'Address is required'),
    userId: z.string().refine((val) => ObjectId.isValid(val), 'Invalid user ID').optional(),
    createdAt: z.string().transform((str) => new Date(str)). optional(),
    updatedAt: z.string().transform((str) => new Date(str)). optional()
})

export const updateBakerySchema = bakerySchema.partial()

export type BakerySchema = z.infer<typeof bakerySchema>;
export type UpdateBakerySchema = z.infer<typeof updateBakerySchema>;