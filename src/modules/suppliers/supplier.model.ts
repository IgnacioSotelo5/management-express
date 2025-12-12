import { prisma } from "@/db/client";

import { Supplier } from "@/db/generated/client";

export class SupplierModel{

    static async getSuppliers({userId, name}: {userId: string, name?: string}): Promise<Supplier[]> {
        const suppliers = await prisma.supplier.findMany({
            where: {
                name: {
                    contains: name,
                    mode: 'insensitive'
                },
                bakery: {
                    ownerId: userId
                }
            }
        })

        return suppliers
    }

    static async getSupplierById({id, userId}: {id: string, userId: string}): Promise<Supplier | null> {
        const supplier = await prisma.supplier.findFirst({
            where: {
                id,
                bakery: {
                    ownerId: userId
                }
            }
        })

        return supplier
    }

    static async createSupplier({name, phoneNumber, userId}: Pick<Supplier, 'name' | 'phoneNumber'> & {userId: string}): Promise<Supplier> {
        const supplier = await prisma.supplier.create({
            data: {
                name,
                phoneNumber,
                bakery: {
                    connect: {
                        ownerId: userId
                    }
                }
            }
        })

        return supplier
        
    }

    static async updateSupplier({id, name, phoneNumber}: Omit<Supplier, 'bakeryId'>): Promise<Supplier>{
        const updatedSupplier = await prisma.supplier.update({
            where: {
                id
            }, 
            data: {
                name,
                phoneNumber
            }
        })

        return updatedSupplier
    }

    static async deleteSupplier({id}: {id: string}): Promise<Supplier | null> {
        const deletedSupplier = await prisma.supplier.delete({
            where: {
                id
            }
        })
        
        return deletedSupplier
    }
}