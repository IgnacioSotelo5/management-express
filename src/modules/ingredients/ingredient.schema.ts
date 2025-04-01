
import { ObjectId } from "mongodb";
import { z } from "zod";
import { CategorySchema } from "../category/category.schema";
import { SupplierSchema } from "../suppliers/supplier.schema"
import { userSchema } from "../users/user.schema";



export const ingredientSchema = z.object({
    name: z.string().min(1, 'Name cannot be empty'),
    pricePerUnit: z.number().positive().min(0, 'Price per unit should be provided'),
    unit: z.string().refine((val) => ['g', 'kg', 'cc', 'lts', 'u'].includes(val), {message: 'Invalid unit value'}),
    totalUnit: z.number().int().optional(),
    category: CategorySchema,
    supplier: SupplierSchema,
    user: userSchema,
    expirationDate: z.string().transform((str) => new Date(str)),
    stockQuantity: z.number().optional(),
    reorderLevel: z.number().optional(),
})

export const updateIngredientSchema = z.object({
        name: z.string().min(1, 'Name cannot be empty'),
        pricePerUnit: z.number().positive().min(0, 'Price per unit should be provided'),
        unit: z.string().refine((val) => ['g', 'kg', 'cc', 'lts', 'u'].includes(val), {message: 'Invalid unit value'}),
        totalUnit: z.number().int().optional(),
        category: CategorySchema,
        supplier: SupplierSchema,
        expirationDate: z.string().transform((str) => new Date(str)),
        stockQuantity: z.number().optional(),
        reorderLevel: z.number().optional(),
    }).partial()

export type Ingredient = z.infer<typeof ingredientSchema>
export type updateIngredient = z.infer<typeof updateIngredientSchema>
