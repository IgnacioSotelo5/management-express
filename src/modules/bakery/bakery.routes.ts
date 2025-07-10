import { asyncHandler } from "@/shared/utils/async-handler";
import { Router } from "express";
import { BakeryController } from "./bakery.controller";
import { validateParams } from "@/shared/middlewares/validateParams";
import { idParamSchema } from "@/shared/schemas/params";
import { validateSchema } from "@/shared/middlewares/validateSchema";
import { bakerySchema, updateBakerySchema } from "./bakery.schema";

export const bakeryRouter = Router()

bakeryRouter.get('/', asyncHandler(BakeryController.getBakeries))
bakeryRouter.get('/:id', validateParams(idParamSchema), asyncHandler(BakeryController.getBakeryById))
bakeryRouter.post('/', validateSchema(bakerySchema), asyncHandler(BakeryController.createBakery))
bakeryRouter.patch('/:id', validateParams(idParamSchema), validateSchema(updateBakerySchema), asyncHandler(BakeryController.updateBakery))
bakeryRouter.delete('/:id', validateParams(idParamSchema), asyncHandler(BakeryController.deleteBakery))