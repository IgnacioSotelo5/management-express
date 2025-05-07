import prisma from "@/config/prisma";
import { Ingredient, updateIngredient } from "@/modules/ingredients/ingredient.schema";
import { NotFoundError } from "@/shared/errors/not-found.error";

export class IngredientModel{

    static async getIngredientByID({id, userId}: {id: string, userId: string}){
        try {
            const ingredient = await prisma.ingredient.findUnique({
                where: {
                    id,
                    userId
                }
            })

            if(!ingredient){
                throw new NotFoundError(`Cannot find ingredient with ID ${id} in DB.`)
            }
    
            return ingredient
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    static async getAllIngredients({userId}: {userId: string}){
        try {
            const result = await prisma.ingredient.findMany({
               where: { userId }
            })

            return result
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    static async createIngredient({ingredient, userId}: {ingredient: Ingredient, userId: string}){
        try {
            const newIngredient = await prisma.ingredient.create({
                data: {
                    ...ingredient,
                    category: {
                        connect: {
                            id: ingredient.category.id
                        }
                    },
                    supplier: {
                        connect: {
                            id: ingredient.supplier.id
                        }
                    },
                    user: {
                        connect: {
                            id: userId
                        }
                    }
                }
            })
    
            return newIngredient
        } catch (error: any) {
            throw new Error(`Error creating ingredient: ${error.message}`);
        }
    }

    static async updateIngredient({id, data, categoryUpdate, supplierUpdate, userId}:{id: string, data: updateIngredient, categoryUpdate: any, supplierUpdate: any, userId: string}){       
        
        try {
            const updatedIngredient = await prisma.ingredient.update({
                where: {id, userId},
                data: {
                    name: data.name,
                    pricePerUnit: data.pricePerUnit,
                    unit: data.unit,
                    totalUnit: data.totalUnit,
                    expirationDate: data.expirationDate,
                    stockQuantity:data.stockQuantity,
                    reorderLevel:data.reorderLevel,
                    category: categoryUpdate,
                    supplier: supplierUpdate
                }
            })

            return updatedIngredient
        } catch (error: any) {
            throw new Error(`Error updating ingredient: ${error.message}`)
        }
    }
    
    static async deleteIngredient({id}: {id: string}){
        try {
            const result = await prisma.ingredient.delete({
                where: {
                    id
                },
                select: {
                    id: true,
                    name: true
                }
            })
            
            return result
        } catch (error: any) {
            throw new Error(`Error deleting ingredient: ${error.message}`)
        }
    }
}
