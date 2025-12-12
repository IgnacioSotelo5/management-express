import { BadRequestError } from "@/shared/errors/bad-request.error";
import { CategoryModel } from "./category.model";
import { Category, UpdateCategory } from "./category.schema";
import { NotFoundError } from "@/shared/errors/not-found.error";
import { getUserBakeryId } from "@/shared/utils/getUserBakeryId";

export class CategoryService {

    static async getCategories({userId, name}: {userId: string, name?: string}): Promise<Category[]>{
        if(!userId){
            throw new BadRequestError('No userId provided')
        }

        return await CategoryModel.getCategories({userId, name})
    }

    static async getCategoryById({id, userId}: {id: string, userId: string}): Promise<Category | null>{
        if(!id || !userId){
            throw new BadRequestError('No id or userId provided')
        }

        return await CategoryModel.getCategoryById({id, userId})
    }

    static async createCategory({name, type, description, userId}: Category & {userId: string}): Promise<Category> {
        if(!name || !type){
            throw new BadRequestError('There is required data missing. Please check the request.')
        }
        const bakeryId = await getUserBakeryId(userId)

        if(!bakeryId) {
            throw new NotFoundError('Bakery not found for the attached user')
        }

        return await CategoryModel.createCategory({name, type, description, bakeryId})
    }

    static async updateCategory({id, name, type, description, userId}: UpdateCategory & {userId: string}): Promise<Category>{
        if(!id){
            throw new BadRequestError('No category id provided')
        }

        const category = await CategoryModel.getCategoryById({id, userId})

        if(!category){
            throw new NotFoundError(`Category with id ${id} not found`)
        }

        if(!name && !type && !description){
            throw new BadRequestError('There is no data to update. Please check the request.')
        }

        const updateData: Omit<UpdateCategory, 'id' | 'bakeryId' | 'bakery'> = {
            name: name ?? category.name,
            type: type ?? category.type,
            description: description ?? category.description,
        }
        return await CategoryModel.updateCategory({id, ...updateData})
    }

    static async deleteCategory({id}: {id: string}): Promise<Category | null>{
        if(!id){
            throw new BadRequestError('No category id provided')
        }

        return await CategoryModel.deleteCategory({id})
    }
}