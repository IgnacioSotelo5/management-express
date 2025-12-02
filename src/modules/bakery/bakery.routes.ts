import { asyncHandler } from "@/shared/utils/async-handler";
import { Router } from "express";
import { BakeryController } from "./bakery.controller";
import { validateParams } from "@/shared/middlewares/validateParams";
import { idParamSchema } from "@/shared/schemas/params";
import { validateSchema } from "@/shared/middlewares/validateSchema";
import { bakerySchema, updateBakerySchema } from "./bakery.schema";
import { checkBakeryAccess } from "@/shared/middlewares/checkBakeryAccess";

export const bakeryRouter = Router()

bakeryRouter.use('/:id', checkBakeryAccess)

// "Public" routes (Requires access but not specific bakery ID)
bakeryRouter.get('/', asyncHandler(BakeryController.getBakeries))
bakeryRouter.post('/', validateSchema(bakerySchema), asyncHandler(BakeryController.createBakery))

// Routes below require bakery ID
bakeryRouter.get('/:id', validateParams(idParamSchema), asyncHandler(BakeryController.getBakeryById))
bakeryRouter.patch('/:id', validateParams(idParamSchema), validateSchema(updateBakerySchema), asyncHandler(BakeryController.updateBakery))
bakeryRouter.delete('/:id', validateParams(idParamSchema), asyncHandler(BakeryController.deleteBakery))