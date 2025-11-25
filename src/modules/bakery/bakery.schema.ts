import { z } from "zod";

export const bakerySchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string().min(1, 'Name is required').max(255, 'Name cannot exceed 255 characters'),
    address: z.string().min(1, 'Address is required'),
    userId: z.string().uuid().optional(),
    createdAt: z.string().transform((str) => new Date(str)). optional(),
    updatedAt: z.string().transform((str) => new Date(str)). optional()
})

export const updateBakerySchema = bakerySchema.partial()

export type BakerySchema = z.infer<typeof bakerySchema>;
export type UpdateBakerySchema = z.infer<typeof updateBakerySchema>;