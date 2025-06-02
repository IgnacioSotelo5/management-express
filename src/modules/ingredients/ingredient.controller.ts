import { IngredientModel } from "@/modules/ingredients/ingredient.model";
import { NextFunction, Request, Response } from "express";
import { IngredientService } from "./ingredient.service";

export class IngredientController{

    static async getIngredientByID(req: Request, res: Response, next: NextFunction): Promise<void>{
        const {id} = req.params
        const {id: userId} = req.user

        try {
            const data = await IngredientService.getIngredientById({id, userId})
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async getAllIngredients(req: Request, res: Response, next: NextFunction): Promise<void>{
        const {id: userId} = req.user
        try {
            const data = await IngredientService.getAllIngredients({userId})
            res.status(200).json(data)
        } catch (error: any) {
            next(error)
        }
    }
    
    static async createIngredient(req: Request, res: Response, next: NextFunction): Promise<void>{
        const {name, pricePerUnit, unit, totalUnit, category, supplier, expirationDate,stockQuantity, reorderLevel} = req.body
        const {id: userId} = req.user
        
        const ingredient = {
            name,
            pricePerUnit, 
            unit, 
            totalUnit, 
            category, 
            supplier, 
            expirationDate, 
            stockQuantity, 
            reorderLevel
        }
        try {
            const result = await IngredientService.createIngredient({
                ingredient,
                userId
            })
            
            res.status(201).json(result)

        } catch (error: any) {            
            next(error)
        }

        return 
    }

    static async updateIngredient(req: Request, res: Response, next: NextFunction): Promise<void>{
        const {id} = req.params
        const {userId} = req.user
        
        try {
            const result = await IngredientService.updateIngredient({id, ingredient: req.body, userId})
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    static async deleteIngredient(req: Request, res: Response, next: NextFunction){
        const {id} = req.params
        try {
            const result = await IngredientModel.deleteIngredient({id})
            res.status(200).json(result)
        } catch (error: any) {
            next(error)   
        }
    }
}