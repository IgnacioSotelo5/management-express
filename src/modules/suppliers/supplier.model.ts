import prisma from "@/config/prisma";
import { Supplier } from "./supplier.schema";

export class SupplierModel{
    static async getOrCreateSupplier({name, phoneNumber, userId}: Supplier){
        try {
            const supplier = await prisma.supplier.upsert({
                where: {name},
                update: {},
                create: {
                    name, 
                    phoneNumber,
                    user: {
                        connect:{
                            id: userId
                        }
                    }
                }
            })
    
            return supplier
        } catch (error: any) {
            throw new Error(`Error creating or getting Supplier: ${error.message}`)
        }
    }
}