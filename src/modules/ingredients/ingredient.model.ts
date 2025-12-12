import { prisma } from "@/db/client";
import { IngredientUpdateInput } from "@/db/generated/models";

import { Ingredient, updateIngredient } from "@/modules/ingredients/ingredient.schema";
import { ForbiddenError } from "@/shared/errors/forbidden.error";
import { NotFoundError } from "@/shared/errors/not-found.error";
import { getUserBakeryId } from "@/shared/utils/getUserBakeryId";

export class IngredientModel{

    static async getIngredientByID({id, userId}: {id: string, userId: string}){
        const isBakeryUser = await getUserBakeryId(userId)
        const ingredient = await prisma.ingredient.findFirst({
            where: {
                id,
                bakeryId: isBakeryUser || undefined
            }
        })

        return ingredient

    }

    static async getAllIngredients({userId}: {userId: string}){        
        const isBakeryUser = await getUserBakeryId(userId)
        const result = await prisma.ingredient.findMany({
            where: { 
                bakeryId: isBakeryUser || undefined
            }
        })

        return result
    }

    static async createIngredient({ingredient, bakeryId}: {ingredient: Ingredient, bakeryId: string}){
        const {categoryId, supplierId, ...data} = ingredient
        const newIngredient = await prisma.ingredient.create({
            data: {
                ...data,         
                category: {
                    connect: {
                        id: ingredient.categoryId
                    }
                },
                ...(supplierId && {
                    supplier: {
                        connect: {
                            id: ingredient.supplierId
                        }
                    }
                }),
                bakery: {
                    connect: {
                        id: bakeryId
                    }
                }
            }
        })

        return newIngredient
        
    }

    static async updateIngredient({id, updatedData, categoryUpdate, supplierUpdate}:{id: string, updatedData: IngredientUpdateInput, categoryUpdate: any, supplierUpdate: any}){       
        const updatedIngredient = await prisma.ingredient.update({
            where: {
                id
            },
            data: {
                ...updatedData,
                category: categoryUpdate,
                supplier: supplierUpdate
            },
        })

        return updatedIngredient
        
    }
    
    static async deleteIngredient({id}: {id: string}){
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
        
    }
}
