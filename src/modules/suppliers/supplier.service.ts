import { UnauthorizedError } from "@/shared/errors/unauthorized.error";
import { SupplierModel } from "./supplier.model";
import { BadRequestError } from "@/shared/errors/bad-request.error";
import { SupplierSchema, UpdateSupplier } from "./supplier.schema";
import { NotFoundError } from "@/shared/errors/not-found.error";

export class SupplierService {
    static async getSuppliers({userId, name}: {userId: string, name?: string}){
        if(!userId){
            throw new UnauthorizedError('A Bakery user must be logged in to access this resource')
        }
        const suppliers = await SupplierModel.getSuppliers({userId, name})

        if(!suppliers || suppliers.length === 0){
            throw new NotFoundError('No suppliers found. Please check the bakery or the name provided.')
        }
        return suppliers
    }

    static async getSupplierById({id, userId}: {id: string, userId: string}){
        if(!id || !userId) {
            throw new BadRequestError('No id or bakery provided, check the request.')
        }
        const supplier = await SupplierModel.getSupplierById({id, userId})

        if(!supplier) {
            throw new NotFoundError('Supplier not found. Please check the id provided.')
        }

        return supplier
    }

    static async createSupplier({name, phoneNumber, userId}: SupplierSchema) {
        if(!name || !userId) {
            throw new BadRequestError('Data to create supplier is missing. Please check the request.')
        }

        const supplier = await SupplierModel.createSupplier({name, phoneNumber, userId})

        return supplier
    }

    static async updateSupplier({id, name, phoneNumber, userId}: UpdateSupplier){
        if(!id || !userId){
            throw new BadRequestError('No id or bakery provided, check the request.')
        }

        if(!name && !phoneNumber){
            throw new BadRequestError('There is required data missing to update the supplier. Please check the request.')
        }

        const existingSupplier = await SupplierModel.getSupplierById({id, userId})

        if(!existingSupplier){
            throw new NotFoundError('Supplier not found. Please check the id provided.')
        }

        const data = {
            name: name ?? existingSupplier.name,
            phoneNumber: phoneNumber ?? existingSupplier.phoneNumber,
        }

        const updatedSupplier = await SupplierModel.updateSupplier({id, ...data})

        return updatedSupplier
    }

    static async deleteSupplier({id, userId}: {id: string, userId: string}) {
        if(!id || !userId){
            throw new BadRequestError('No ID provided. Unable to delete the supplier. Please check the request.')
        }

        const existingSupplier = await SupplierModel.getSupplierById({id, userId})

        if(!existingSupplier){
            throw new NotFoundError('Supplier not found. Please check the id provided.')
        }

        const deletedSupplier = await SupplierModel.deleteSupplier({id: existingSupplier.id})

        return deletedSupplier
    }
}