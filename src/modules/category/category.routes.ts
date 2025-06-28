import { Router } from "express";
import { CategoryController } from "./category.controller";
import { asyncHandler } from "@/shared/utils/async-handler";
import { validateParams } from "@/shared/middlewares/validateParams";
import { idParamSchema } from "@/shared/schemas/params";
import { validateSchema } from "@/shared/middlewares/validateSchema";
import { categorySchema, updateCategorySchema } from "./category.schema";

export const categoryRouter = Router()

categoryRouter.get('/', asyncHandler(CategoryController.getCategories))
categoryRouter.get('/:id', validateParams(idParamSchema), asyncHandler(CategoryController.getCategoryById))
categoryRouter.post('/', validateSchema(categorySchema), asyncHandler(CategoryController.createCategory))
categoryRouter.patch('/:id', validateParams(idParamSchema), validateSchema(updateCategorySchema), asyncHandler(CategoryController.updateCategory))
categoryRouter.delete('/:id', validateParams(idParamSchema), asyncHandler(CategoryController.deleteCategory))