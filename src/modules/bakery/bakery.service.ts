import { BadRequestError } from "@/shared/errors/bad-request.error";
import { BakeryModel } from "./bakery.model";
import { NotFoundError } from "@/shared/errors/not-found.error";
import { BakerySchema, UpdateBakerySchema } from "./bakery.schema";
import { ConflictError } from "@/shared/errors/conflict.error";

export class BakeryService {
    static async getBakeries() {
        return await BakeryModel.getBakeries()
    }

    static async getBakeryById(id: string) {
        if(!id) {
            throw new BadRequestError('Bakery ID is required')
        }

        const bakery = await BakeryModel.getBakeryById(id)

        if(!bakery) {
            throw new NotFoundError(`Bakery with ID ${id} not found`)
        }

        return bakery
    }

    static async createBakery({name, address, userId}: Pick<BakerySchema, 'name' | 'address' | 'userId'>) {
        if(!name || !address || !userId){
            throw new BadRequestError('There are missing required fields. Please check the request.')
        }

        try {
            return await BakeryModel.createBakery({name, address, userId})
        } catch (error: any) {
            // Handle unique constraint violation on ownerId
            if (error.code === 'P2002' && error.meta?.target?.includes('ownerId')) {
                throw new ConflictError('This user already has a bakery associated.')
            }
            throw error
        }
    }

    static async updateBakery({id, name, address, userId}: UpdateBakerySchema){
        if(!name || !address || !userId || !id){
            throw new BadRequestError('There are missing required fields. Please check the request.')
        }

        const existingBakery = await BakeryModel.getBakeryById(id)
        if(!existingBakery) {
            throw new NotFoundError(`Bakery with ID ${id} not found`)
        }
        const data = {
            name: name ?? existingBakery.name,
            address: address ?? existingBakery.address,
        }

        return await BakeryModel.updateBakery({...data, id, userId})
    }

    static async deleteBakery(id: string){
        if(!id) {
            throw new BadRequestError('Bakery ID is required.')
        }
        const bakery = await BakeryModel.getBakeryById(id)

        if(!bakery) {
            throw new NotFoundError(`Bakery with ID ${id} not found`)
        }

        return await BakeryModel.deleteBakery(id)
    }
}