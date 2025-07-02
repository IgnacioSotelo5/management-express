import { Router } from "express";
import { SupplierController } from "./supplier.controller";
import { validateParams } from "@/shared/middlewares/validateParams";
import { idParamSchema } from "@/shared/schemas/params";
import { validateSchema } from "@/shared/middlewares/validateSchema";
import { supplierSchema, updateSupplierSchema } from "./supplier.schema";
import { asyncHandler } from "@/shared/utils/async-handler";

export const supplierRouter = Router()

supplierRouter.get('/', asyncHandler(SupplierController.getSuppliers))
supplierRouter.get('/:id', validateParams(idParamSchema), asyncHandler(SupplierController.getSupplierById))
supplierRouter.post('/', validateSchema(supplierSchema), asyncHandler(SupplierController.createSupplier))
supplierRouter.patch('/:id', validateParams(idParamSchema), validateSchema(updateSupplierSchema), asyncHandler(SupplierController.updateSupplier))
supplierRouter.delete('/:id', validateParams(idParamSchema), asyncHandler(SupplierController.deleteSupplier))