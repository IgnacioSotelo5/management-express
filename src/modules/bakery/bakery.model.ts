import { prisma } from "@/db/client";
import { Bakery } from "@/db/generated/client";
export class BakeryModel {
    static getBakeries(): Promise<Bakery[]>{
        return prisma.bakery.findMany()
    }

    static getBakeryById(id: string): Promise<Bakery | null>{
        return prisma.bakery.findUnique({
            where: {
                id: id
            }
        })
    }

    static async createBakery({name, address, userId}: {name: string, address: string, userId: string}): Promise<Bakery> {
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
    }

    static async updateBakery({id, name, address, userId}: {id: string, name: string, address: string, userId: string}): Promise<Bakery> {
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
    }

    static async deleteBakery(id: string): Promise<Bakery | null> {
        const bakery = await prisma.bakery.delete({
            where: {
                id
            }
        })
        return bakery
    }
}