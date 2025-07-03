import prisma from "@/config/prisma";
import { UpdateSupplier } from "./supplier.schema";
import { Supplier } from "@prisma/client";

export class SupplierModel{

    static async getSuppliers({userId, name}: {userId: string, name?: string}): Promise<Supplier[]> {
        try {
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
        } catch (error) {
            throw error
        }
    }

    static async getSupplierById({id, userId}: {id: string, userId: string}): Promise<Supplier | null> {
        try {
            const supplier = await prisma.supplier.findFirst({
                where: {
                    id,
                    bakery: {
                        ownerId: userId
                    }
                }
            })

            return supplier
        } catch (error) {
            throw error
        }
    }

    static async createSupplier({name, phoneNumber, userId}: Pick<Supplier, 'name' | 'phoneNumber'> & {userId: string}): Promise<Supplier> {
        try {
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
        } catch (error) {
            throw error
        }
    }

    static async updateSupplier({id, name, phoneNumber}: Omit<Supplier, 'bakeryId'>): Promise<Supplier>{
        try {
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
        } catch (error) {
            throw error
        }
    }

    static async deleteSupplier({id}: {id: string}): Promise<Supplier | null> {
        try {
            const deletedSupplier = await prisma.supplier.delete({
                where: {
                    id
                }
            })

            return deletedSupplier
        } catch (error) {
            throw error
        }
    }
}