import { prisma } from "@/db/client";
import { Bakery } from "@/db/generated/client";
export class BakeryModel {
    static getBakeries(): Promise<Bakery[]>{
        try {
            return prisma.bakery.findMany()
        } catch (error) {
            throw error
        }
    }

    static getBakeryById(id: string): Promise<Bakery | null>{
        try {
            return prisma.bakery.findUnique({
                where: {
                    id: id
                }
            })
        } catch (error) {
            throw error
        }
    }

    static async createBakery({name, address, userId}: {name: string, address: string, userId: string}): Promise<Bakery> {
        try {
            const bakery = await prisma.bakery.create({
                data: {
                    name,
                    address,
                    owner: {
                        connect: {
                            id: userId
                        }
                    }
                }
            })

            return bakery
        } catch (error) {
            throw error
        }
    }

    static async updateBakery({id, name, address, userId}: {id: string, name: string, address: string, userId: string}): Promise<Bakery> {
        try {
            const bakery = await prisma.bakery.update({
                where: {
                    id,
                    ownerId: userId
                },
                data: {
                    name,
                    address
                }
            })

            return bakery
        } catch (error) {
            throw error
        }
    }

    static async deleteBakery(id: string): Promise<Bakery | null> {
        try {
            const bakery = await prisma.bakery.delete({
                where: {
                    id
                }
            })
            return bakery
        } catch (error) {
            throw error
        }
    }
}