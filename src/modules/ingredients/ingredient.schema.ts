
import { z } from "zod";
import { categorySchema } from "../category/category.schema";
import { supplierSchema, updateSupplierSchema } from "../suppliers/supplier.schema"
import { userSchema } from "../users/user.schema";



export const ingredientSchema = z.object({
    name: z.string().min(1, 'Name cannot be empty'),
    pricePerUnit: z.number().positive().min(0, 'Price per unit should be provided'),
    unit: z.string().refine((val) => ['g', 'kg', 'cc', 'lts', 'u'].includes(val), {message: 'Invalid unit value'}),
    totalUnit: z.number().int().optional(),
    categoryId: z.string().uuid('Invalid category ID format. Must be a valid UUID.'),
    supplierId: z.string().uuid('Invalid supplier ID format. Must be a valid UUID.').optional(),
    user: userSchema.optional(),
    expirationDate: z.string().transform((str) => new Date(str)).optional(),
    stockQuantity: z.number().optional(),
    reorderLevel: z.number().optional(),
    quantityUsed: z.number().optional(),
})

export const updateIngredientSchema = z.object({
        name: z.string().min(1, 'Name cannot be empty'),
        pricePerUnit: z.number().positive().min(0, 'Price per unit should be provided'),
        unit: z.string().refine((val) => ['g', 'kg', 'cc', 'lts', 'u'].includes(val), {message: 'Invalid unit value'}),
        totalUnit: z.number().int().optional(),
        category: categorySchema,
        supplier: updateSupplierSchema,
        expirationDate: z.string().transform((str) => new Date(str)),
        stockQuantity: z.number().optional(),
        reorderLevel: z.number().optional(),
        quantityUsed: z.number().optional(),
    }).partial()

export type Ingredient = z.infer<typeof ingredientSchema>
export type updateIngredient = z.infer<typeof updateIngredientSchema>
