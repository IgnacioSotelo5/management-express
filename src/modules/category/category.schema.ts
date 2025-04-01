import { ObjectId } from "mongodb";
import { z } from "zod";

export const CategorySchema = z.object({
    id: z.string().refine((val) => ObjectId.isValid(val)).optional(),
    name: z.string().min(1, 'Category name cannot be empty'),
    type: z.string().refine((val) => ['ingredients', 'equipment', 'supply'].includes(val), {message: 'Invalid category type'}),
    description: z.string().optional().nullable()
})

export const updateIngredientCategorySchema = z.object({
    params: z.object({
        id: z.string().refine((val) => ObjectId.isValid(val))
    }),
    body: CategorySchema.partial()
})

export type Category = z.infer<typeof CategorySchema>
export type updateCategory = z.infer<typeof updateIngredientCategorySchema>