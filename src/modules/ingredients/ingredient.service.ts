import { BadRequestError } from "@/shared/errors/bad-request.error";
import { IngredientModel } from "./ingredient.model";
import { Ingredient, updateIngredient } from "./ingredient.schema";
import { NotFoundError } from "@/shared/errors/not-found.error";
import { CategoryModel } from "../category/category.model";
import { SupplierModel } from "../suppliers/supplier.model";
import { getUserBakeryId } from "@/shared/utils/getUserBakeryId";
import { ForbiddenError } from "@/shared/errors/forbidden.error";
import { UserModel } from "../users/user.model";
import { IngredientUpdateInput } from "@/db/generated/models";

export class IngredientService{

    static async getAllIngredients({userId}: {userId: string}){
        return await IngredientModel.getAllIngredients({userId})
    }

    static async getIngredientById({id, userId}: {id: string, userId: string}){
        if(!id){
            throw new BadRequestError("No ID provided")
        }

        const ingredient = await IngredientModel.getIngredientByID({id, userId})

        if(!ingredient){ 
            throw new NotFoundError(`Ingredient with ID ${id} not found.`)
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

        const bakeryId = await getUserBakeryId(userId)

        if(!bakeryId){
            throw new ForbiddenError('User does not belong to any bakery.')
        }

        return await IngredientModel.createIngredient({ingredient, bakeryId})
    }

    static async updateIngredient({id, ingredient, userId}: {id: string, ingredient: updateIngredient, userId: string}){
        const data = ingredient

        const existingIngredient = await IngredientModel.getIngredientByID({id, userId})
        if(!existingIngredient){
            throw new NotFoundError('Ingredient not found in DB.')
        }

        const userRole = await UserModel.getUserRole(userId)

        const employeeAllowedFields = [
            "name",
            "stockQuantity",
            "categoryId",
            "supplierId",
            "quantityUsed",
            "expirationDate"
        ];

        const receivedFields = Object.keys(data);

        if (userRole === "EMPLOYEE") {
            const invalidFields = receivedFields.filter(
                (field) => !employeeAllowedFields.includes(field)
            );

            if (invalidFields.length > 0) {
                throw new ForbiddenError(`Employees are not allowed to update the following fields: ${invalidFields.join(", ")}`);
            }
        }

        let updatedData: IngredientUpdateInput = {}
        if (userRole === "OWNER") {
            updatedData = {
                name: data.name,
                pricePerUnit: data.pricePerUnit,
                unit: data.unit,
                totalUnit: data.totalUnit,
                expirationDate: data.expirationDate ? new Date(data.expirationDate) : undefined,
                stockQuantity: data.stockQuantity,
                reorderLevel: data.reorderLevel,
                quantityUsed: data.quantityUsed,
            };
        } else if (userRole === "EMPLOYEE") {
            // Si el usuario es EMPLOYEE, solo permitimos ciertos campos
            updatedData = {
                name: data.name,           // El nombre puede ser actualizado
                stockQuantity: data.stockQuantity,   // Cantidad de stock
                quantityUsed: data.quantityUsed,    // Cantidad usada
                expirationDate: data.expirationDate ? new Date(data.expirationDate) : undefined,  // Fecha de expiración
            };
        }

        let categoryUpdate = data.category ? {
            connectOrCreate: {
                where: {name: data.category.name},
                create: {
                    name: data.category.name,
                    type: data.category.type,
                    description: data.category.description
                }
            }
        } : undefined

        let supplierUpdate = data.supplier !== undefined 
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

        return await IngredientModel.updateIngredient({id, updatedData, categoryUpdate, supplierUpdate})
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