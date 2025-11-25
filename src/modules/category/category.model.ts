import { prisma } from "@/db/client";

import { Category, UpdateCategory } from "@/modules/category/category.schema";
import { NotFoundError } from "@/shared/errors/not-found.error";

export class CategoryModel{

    static async getCategories({userId, name}: {userId: string, name?: string}): Promise<Category[]>{   
        try {
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
        } catch (error: any) {
            throw error
        }
    }

    static async getCategoryById({id, userId }: {id: string, userId: string}): Promise<Category | null>{
        try {    
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
        } catch (error) {
            throw error   
        }
    }

    static async createCategory({name, type, description, userId}: Category & {userId: string}): Promise<Category>{        
        try {
            if(userId){
                const bakery = await prisma.bakery.findUnique({
                    where: {
                        ownerId: userId
                    },
                    select: {
                        id: true
                    }
                })

                if(!bakery){
                    throw new NotFoundError('Bakery not found for the attached user')
                }
                
                const newCategory = await prisma.category.create({
                    data: {
                        name,
                        type,
                        description,
                        bakery: {
                            connect: {
                                id: bakery?.id
                            }
                        }
                    },
                })

                return newCategory
            } else {
                const newCategory = await prisma.category.create({
                    data: {
                        name,
                        type,
                        description,
                        bakery: undefined
                    }
                })

                return newCategory
            }
        } catch (error: any) {
            throw error
        }
    }

    static async getOrCreateCategory({id, name, type, description, userId}: Category & {userId: string}): Promise<Category>{
        try {
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
        } catch (error: any) {
            throw error
        }
    }

    static async updateCategory({id, name, type, description}: UpdateCategory): Promise<Category>{
        try {
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
        } catch (error) {
            throw error
        }
        
    }

    static async deleteCategory({id}: {id: string}): Promise<Category>{
        try {
            const result = await prisma.category.delete({
                where: {
                    id
                }
            })

            return result
        } catch (error: any) {
            throw error
        }
    }
}