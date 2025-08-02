import { BadRequestError } from "@/shared/errors/bad-request.error";
import { IngredientModel } from "./ingredient.model";
import { Ingredient, updateIngredient } from "./ingredient.schema";
import { NotFoundError } from "@/shared/errors/not-found.error";
import { CategoryModel } from "../category/category.model";
import { SupplierModel } from "../suppliers/supplier.model";

export class IngredientService{

    static async getAllIngredients({userId}: {userId: string}){
        return await IngredientModel.getAllIngredients({userId})
    }

    static async getIngredientById({id, userId}: {id: string, userId: string}){
        if(!id){
            throw new BadRequestError("No ID provided")
        }
        return await IngredientModel.getIngredientByID({id, userId})
    }

    static async createIngredient({ingredient, userId}: {ingredient: Ingredient, userId: string}){
        if(!ingredient || !userId){
            throw new BadRequestError('There is required data missing. Please check the request.')
        }

        const category = await CategoryModel.getCategoryById({id: ingredient.categoryId, userId})
        if(!category) { 
            throw new NotFoundError(`Category with ID ${ingredient.categoryId} not found.`)
        }

        if(ingredient.supplierId){
            const supplier = await SupplierModel.getSupplierById({id: ingredient.supplierId, userId})
            if(!supplier) {
                throw new NotFoundError(`Supplier with ID ${ingredient.supplierId} not found.`)
            }
        }

        return await IngredientModel.createIngredient({ingredient, userId})
    }

    static async updateIngredient({id, ingredient, userId}: {id: string, ingredient: updateIngredient, userId: string}){
        const data = ingredient

        //Verificamos si existe el ingrediente, si no el existe el modelo se encarga de lanzar un error personalizado,
        //usamos el id y el userId para evitar que un usuario pueda modificar ingredientes de otros usuarios
        await IngredientModel.getIngredientByID({id, userId})
        
        const categoryUpdate = data.category ? {
            connectOrCreate: {
                where: {name: data.category.name},
                create: {
                    name: data.category.name,
                    type: data.category.type,
                    description: data.category.description
                }
            }
        } : undefined

        const supplierUpdate = data.supplier !== undefined 
        ? data.supplier !== null 
            ? {
                connectOrCreate: {
                    where: { name: data.supplier.name },
                    create: {
                        name: data.supplier.name,
                        phoneNumber: data.supplier.phoneNumber ?? null
                    }
                }
            }
            : { disconnect: true }
        : undefined
        
        return await IngredientModel.updateIngredient({id, data, categoryUpdate, supplierUpdate, userId})
    }

    static async deleteIngredient({id, userId}: {id: string, userId: string}){
        if(!id){
            throw new BadRequestError('No id provided')
        }

        const existingIngredient = await IngredientModel.getIngredientByID({id, userId})

        if(!existingIngredient) throw new NotFoundError('Ingredient not found in DB.')

        const deletedIngredient = await IngredientModel.deleteIngredient({id: existingIngredient.id})

        return {message: `The ingredient ${deletedIngredient.name} was deleted successfully.`, data: deletedIngredient }
    }
}   