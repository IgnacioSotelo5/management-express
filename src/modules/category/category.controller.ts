import { NextFunction, Request, Response } from "express";
import { CategoryService } from "./category.service";

export class CategoryController {

    static async getCategories(req: Request, res: Response, next: NextFunction){
        const {id: userId} = req.user
        const {name} = req.query

        try {
            const data = await CategoryService.getCategories({userId, name: typeof name === 'string' ? name : undefined})

            res.status(200).json(data)
        } catch (error) {
            next(error)   
        }
    }

    static async getCategoryById(req: Request, res: Response, next: NextFunction){
        const {id: userId} = req.user
        const {id} = req.params

        try {
            const data = await CategoryService.getCategoryById({id, userId})
                
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }

    }

    static async createCategory(req: Request, res: Response, next: NextFunction){
        const {name, type, description} = req.body
        const {id: userId} = req.user

        try {
            const data = await CategoryService.createCategory({name, type, description, userId})
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async getOrCreateCategory(req: Request, res: Response, next: NextFunction){
        

    }

    static async updateCategory(req: Request, res: Response, next: NextFunction){
        const {name, type, description} = req.body
        const {id: userId} = req.user
        const {id} = req.params        

        try {
            const data = await CategoryService.updateCategory({id, name, type, description, userId})
            
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async deleteCategory(req: Request, res: Response, next: NextFunction){
        const {id} = req.params 

        try {
            const data = await CategoryService.deleteCategory({id})
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

}