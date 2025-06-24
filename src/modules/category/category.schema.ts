import { ObjectId } from "mongodb";
import { z } from "zod";
import { bakerySchema } from "../bakery/bakery.schema";

export const categorySchema = z.object({
    id: z.string().refine((val) => ObjectId.isValid(val)).optional(),
    name: z.string().min(1, 'Category name cannot be empty'),
    type: z.enum(['INGREDIENTS', 'EQUIPMENT', 'SUPPLY'], {message: 'Invalid category type'}),
    description: z.string().optional().nullable(),
    bakeryId: z.string().refine((val) => ObjectId.isValid(val)).nullable().optional(),
    bakery: bakerySchema.optional()
})

export const updateCategorySchema = categorySchema.partial()

export type Category = z.infer<typeof categorySchema>
export type UpdateCategory = z.infer<typeof updateCategorySchema>