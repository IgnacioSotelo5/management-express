import { NextFunction, Request, Response } from "express";
import { BakeryService } from "./bakery.service";

export class BakeryController {
    static async getBakeries(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const data = await BakeryService.getBakeries()
            res.status(200).json(data)
        } catch (error) {
            next(error)       
        }
    }

    static async getBakeryById(req: Request, res: Response, next: NextFunction): Promise<void> {
        const {id} = req.params
        try {
            const data = await BakeryService.getBakeryById(id)
            res.status(200).json(data)
        } catch (error) {
            next(error)   
        }
    }

    static async createBakery(req: Request, res: Response, next: NextFunction): Promise<void> {
        const {name, address} = req.body
        const {id: userId} = req.user

        try {
            const data = await BakeryService.createBakery({name, address, userId})
            res.status(200).json(data)
        } catch (error) {
            next(error)   
        }
    }

    static async updateBakery(req: Request, res: Response, next: NextFunction): Promise<void> {
        const {name, address}= req.body
        const {id} = req.params
        const {id: userId} = req.user
        try {
            const data = await BakeryService.updateBakery({id, name, address, userId})
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async deleteBakery(req: Request, res: Response, next: NextFunction): Promise<void> {
        const {id} = req.params

        try {
            await BakeryService.deleteBakery(id)
            res.status(204).send()
        } catch (error) {
            next(error)
        }
    }
}