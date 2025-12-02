import { NextFunction, Request, Response } from "express";
import { SupplierService } from "./supplier.service";

export class SupplierController{
    static async createSupplier(req: Request, res: Response, next: NextFunction){
        const {name, phoneNumber} = req.body
        const { userId } = req.user
        try {
            const data = await SupplierService.createSupplier({name, phoneNumber, userId})
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async getSuppliers(req: Request, res: Response, next: NextFunction){
        const {name} = req.query
        const { userId } = req.user

        try {
            const data = await SupplierService.getSuppliers({userId, name: typeof name === 'string' ? name : undefined})
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
        
    }

    static async getSupplierById(req: Request, res: Response, next: NextFunction){
        const {id} = req.params
        const { userId } = req.user

        try {
            const data = await SupplierService.getSupplierById({id, userId})
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async updateSupplier(req: Request, res: Response, next: NextFunction){
        const {id} = req.params
        const { userId } = req.user
        const {name, phoneNumber} = req.body

        try {
            const data = await SupplierService.updateSupplier({id, userId, name, phoneNumber})
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }


    ///!TODO: Delete the references in the ingredients, supplies and equipment when delete a supplier
    /// Also remember to delete in cascade in the modules that require it.
    /// Example: when deleting a user, delete bakery and the ingredients, suppliers, categories, etc that the user create
    static async deleteSupplier(req: Request, res: Response, next: NextFunction){
        const {id} = req.params
        const { userId } = req.user

        try {
            await SupplierService.deleteSupplier({id, userId})
            res.status(204).send()
        } catch (error) {
            next(error)
        }
    }
}