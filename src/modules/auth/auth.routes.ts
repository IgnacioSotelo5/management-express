import { AuthController } from "@/modules/auth/auth.controller";
import { validateSchema } from "@/shared/middlewares/validateSchema";
import { userLoginSchema, userRegisterSchema } from "@/modules/auth/auth.schema";
import { Router } from "express";
import { authMiddleware } from "@/shared/middlewares/authMiddleware";

export const authRouter = Router();

authRouter.post("/signup", validateSchema(userRegisterSchema), AuthController.signup);

authRouter.post("/login", validateSchema(userLoginSchema), AuthController.login);

authRouter.get('/validate', authMiddleware, AuthController.validateToken)