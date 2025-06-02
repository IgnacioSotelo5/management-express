import { IngredientController } from "@/modules/ingredients/ingredient.controller";
import { validateParams } from "@/shared/middlewares/validateParams";
import { validateSchema } from "@/shared/middlewares/validateSchema";
import { ingredientSchema, updateIngredientSchema } from "@/modules/ingredients/ingredient.schema";
import { idParamSchema } from "@/shared/schemas/params";
import { Router } from "express";
import { asyncHandler } from "@/shared/utils/async-handler";

export const ingredientRouter = Router();

ingredientRouter.get('/', asyncHandler(IngredientController.getAllIngredients))
ingredientRouter.get('/:id', validateParams(idParamSchema), asyncHandler(IngredientController.getIngredientByID))
ingredientRouter.post('/', validateSchema(ingredientSchema), asyncHandler(IngredientController.createIngredient))
ingredientRouter.patch('/:id', validateParams(idParamSchema), validateSchema(updateIngredientSchema), asyncHandler(IngredientController.updateIngredient))
ingredientRouter.delete('/:id', validateParams(idParamSchema), asyncHandler(IngredientController.deleteIngredient))