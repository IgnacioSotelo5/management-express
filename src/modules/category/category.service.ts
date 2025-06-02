import { BadRequestError } from "@/shared/errors/bad-request.error";
import { CategoryModel } from "./category.model";
import { Category } from "./category.schema";

export class CategoryService {

    static async getCategories({userId, name}: {userId: string, name?: string}): Promise<Category[]>{

        return await CategoryModel.getCategories({userId, name})
    }

    static async getCategoryById({id, userId}: {id: string, userId: string}): Promise<Category | null>{
        if(!id || !userId){
            throw new BadRequestError('No id or userId provided')
        }

        return await CategoryModel.getCategoryById({id, userId})
    }

    static async createCategory({name, type, description, userId}: Category &{userId: string}): Promise<Category> {
        if(!name || !description){
            throw new BadRequestError('There is required data missing. Please check the request.')
        }

        return await CategoryModel.createCategory({name, type, description, userId})
    }
}