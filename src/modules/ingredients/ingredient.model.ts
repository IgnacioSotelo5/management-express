import { prisma } from "@/db/client";
import { IngredientUpdateInput } from "@/db/generated/models";

import { Ingredient, updateIngredient } from "@/modules/ingredients/ingredient.schema";
import { ForbiddenError } from "@/shared/errors/forbidden.error";
import { NotFoundError } from "@/shared/errors/not-found.error";
import { getUserBakeryId } from "@/shared/utils/getUserBakeryId";

export class IngredientModel{

    static async getIngredientByID({id, userId}: {id: string, userId: string}){
        try {
            const isBakeryUser = await getUserBakeryId(userId)
            const ingredient = await prisma.ingredient.findFirst({
                where: {
                    id,
                    bakeryId: isBakeryUser || undefined
                }
            })

            if(!ingredient){
                throw new NotFoundError(`Cannot find ingredient with ID ${id} in DB.`)
            }
    
            return ingredient
        } catch (error: any) {
            throw error
        }
    }

    static async getAllIngredients({userId}: {userId: string}){        
        try {
            const isBakeryUser = await getUserBakeryId(userId)
            const result = await prisma.ingredient.findMany({
               where: { 
                    bakeryId: isBakeryUser || undefined
                }
            })

            return result
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    static async createIngredient({ingredient, userId}: {ingredient: Ingredient, userId: string}){
        const {categoryId, supplierId, ...data} = ingredient
        try {
            const newIngredient = await prisma.ingredient.create({
                data: {
                    ...data,         
                    category: {
                        connect: {
                            id: ingredient.categoryId
                        }
                    },
                    supplier: {
                        connect: {
                            id: ingredient.supplierId
                        }
                    },
                    bakery: {
                        connect: {
                            ownerId: userId
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
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { role: true }
        })
        try {
            const employeeAllowedFields = [
                "name",
                "stockQuantity",
                "categoryId",
                "supplierId",
                "quantityUsed",
                "expirationDate"
            ];

            const receivedFields = Object.keys(data);

            if (user?.role === "employee") {
                const invalidFields = receivedFields.filter(
                    (field) => !employeeAllowedFields.includes(field)
                );

                if (invalidFields.length > 0) {
                    throw new ForbiddenError(`Employees are not allowed to update the following fields: ${invalidFields.join(", ")}`);
                }
            }

            let updatedData: IngredientUpdateInput = {}
            if(user?.role === 'owner'){
                updatedData = {
                    name: data.name,
                    category: categoryUpdate,
                    supplier: supplierUpdate
                }
            } else if(user?.role === 'employee'){
                updatedData = {
                    name: data.name,
                    stockQuantity: data.stockQuantity,
                    category: categoryUpdate,
                    supplier: supplierUpdate
                }
            }
            
            const updatedIngredient = await prisma.ingredient.update({
                where: {
                    id
                },
                data: updatedData
            })

            return updatedIngredient
        } catch (error: any) {
            throw error
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
