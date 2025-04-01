import prisma from "@/config/prisma";
import { Category } from "@/modules/category/category.schema";

export class CategoryModel{
    static async getCategory(name: string): Promise<Category | null>{
        try {
            const result = await prisma.category.findFirst({
                where: {
                    name
                }
            })

            return result
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    static async createCategory({name, type, description}: Category): Promise<Category>{
        try {
            const newCategory = prisma.category.create({
                data: {
                    name,
                    type,
                    description,
                }
            })
    
            return newCategory
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    static async getOrCreateCategory({name, type, description}: Category){
        try {
            const category = await prisma.category.upsert({
                where: {
                    name
                },
                update: {},
                create: {
                    name,
                    type,
                    description
                }
            })
    
            return category
        } catch (error: any) {
            throw new Error(`Error creating or getting category: ${error.message}`)
        }
    }
}