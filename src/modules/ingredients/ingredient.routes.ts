import { IngredientController } from "@/modules/ingredients/ingredient.controller";
import { validateParams } from "@/shared/middlewares/validateParams";
import { validateSchema } from "@/shared/middlewares/validateSchema";
import { ingredientSchema, updateIngredientSchema } from "@/modules/ingredients/ingredient.schema";
import { paramsSchema } from "@/shared/schemas/params";
import { Router } from "express";

export const ingredientRouter = Router();

ingredientRouter.get('/', IngredientController.getAllIngredients)
ingredientRouter.get('/:id', validateParams(paramsSchema), IngredientController.getIngredientByID)
ingredientRouter.post('/', validateSchema(ingredientSchema), IngredientController.createIngredient)
ingredientRouter.patch('/:id', validateParams(paramsSchema), validateSchema(updateIngredientSchema), IngredientController.updateIngredient)
ingredientRouter.delete('/:id', validateParams(paramsSchema), IngredientController.deleteIngredient)