import { BadRequestError } from "@/shared/errors/bad-request.error";
import { IngredientModel } from "./ingredient.model";
import { Ingredient, updateIngredient } from "./ingredient.schema";
import { NotFoundError } from "@/shared/errors/not-found.error";
import { CategoryModel } from "../category/category.model";
import { SupplierModel } from "../suppliers/supplier.model";

export class IngredientService{

    static async getAllIngredients(){
        return await IngredientModel.getAllIngredients()
    }

    static async getIngredientById({id}: {id: string}){
        if(!id){
            throw new BadRequestError("No ID provided")
        }
        return await IngredientModel.getIngredientByID({id})
    }

    static async createIngredient({ingredient}: {ingredient: Ingredient}){
        if(!ingredient){
            throw new BadRequestError("No ingredient provided")
        }
        const {name: categoryName, description} = ingredient.category
        const category = await CategoryModel.getOrCreateCategory({name: categoryName, type: "ingredients", description})

        const {name, phoneNumber} = ingredient.supplier
        const supplier = await SupplierModel.getOrCreateSupplier({name, phoneNumber})

        return await IngredientModel.createIngredient({ingredient: {...ingredient, category, supplier}})
    }

    static async updateIngredient({id, ingredient}: {id: string, ingredient: updateIngredient}){
        const data = ingredient

        //Verificamos si existe el ingrediente, si no el existe el modelo se encarga de lanzar un error personalizado
        await IngredientModel.getIngredientByID({id})
        
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
        
        return await IngredientModel.updateIngredient({id, data, categoryUpdate, supplierUpdate})
    }

    static async deleteIngredient({id}: {id: string}){
        if(!id){
            throw new BadRequestError('No id provided')
        }

        const existingIngredient = await IngredientModel.getIngredientByID({id})

        if(!existingIngredient) throw new NotFoundError('Ingredient not found in DB.')

        const deletedIngredient = await IngredientModel.deleteIngredient({id: existingIngredient.id})

        return {message: `The ingredient ${deletedIngredient.name} was deleted successfully.`, data: deletedIngredient }
    }
}   