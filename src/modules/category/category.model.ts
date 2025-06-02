import prisma from "@/config/prisma";
import { Category, updateCategory } from "@/modules/category/category.schema";

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
            console.log(result);
            
            return result
        } catch (error: any) {
            throw error
        }
    }

    static async getCategoryById({id, userId }: {id: string, userId: string}): Promise<Category | null>{
        try {    
            const category = await prisma.category.findFirst({
                where: {
                    OR: [
                        {
                            id
                        },
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

            console.log(category);
            

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

    static async updateCategory({params, body}: updateCategory): Promise<Category>{
        const {name, description, type} = body
        const {id} = params

        try {
            const updatedCategory = await prisma.category.update({
                where: {
                    id
                },
                data: {
                    name, 
                    description, 
                    type
                }
            })

            return updatedCategory
        } catch (error: any) {
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