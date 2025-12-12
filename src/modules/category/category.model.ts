import { prisma } from "@/db/client";

import { Category, UpdateCategory } from "@/modules/category/category.schema";

export class CategoryModel{

    static async getCategories({userId, name}: {userId: string, name?: string}): Promise<Category[]>{   
        const result = await prisma.category.findMany({
            where: {
                OR: [
                    {
                        bakery: {
                            ownerId: userId
                        }
                    },
                    {
                        bakery: null
                    }
                ],
                ...(name ? {
                    name: {
                        contains: name,
                        mode: 'insensitive'
                    }
                } : {})
            },

        })
        
        return result
    }

    static async getCategoryById({id, userId }: {id: string, userId: string}): Promise<Category | null>{
        const category = await prisma.category.findFirst({
            where: {
                id,
                OR: [
                    {
                        bakery: {
                            ownerId: userId
                        }
                    },
                    {
                        bakery: null
                    }
                ]
            }
        })
        

        return category
    }

    static async createCategory({name, type, description, bakeryId}: Category): Promise<Category>{        
        const newCategory = await prisma.category.create({
            data: {
                name,
                type,
                description,
                ...(
                    bakeryId ? { bakery: { connect: { id: bakeryId } } } : { bakery: undefined }
                )
            },
        })

        return newCategory
    }

    static async getOrCreateCategory({id, name, type, description, userId}: Category & {userId: string}): Promise<Category>{
        const category = await prisma.category.upsert({
            where: {
                id
            },
            update: {},
            create: {
                name,
                type,
                description,
                bakery: userId ? {
                    connect: {
                        ownerId: userId
                    }
                } : undefined
            }
        })

        return category
    }

    static async updateCategory({id, name, type, description}: UpdateCategory): Promise<Category>{
        const updatedCategory = await prisma.category.update({
            where: {
                id
            }, 
            data: {
                name: name,
                type: type,
                description: description,
            }
        })
        
        return updatedCategory
        
    }

    static async deleteCategory({id}: {id: string}): Promise<Category>{
        const result = await prisma.category.delete({
            where: {
                id
            }
        })

        return result
        
    }
}