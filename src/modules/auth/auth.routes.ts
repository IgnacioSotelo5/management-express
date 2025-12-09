import { AuthController } from "@/modules/auth/auth.controller";
import { validateSchema } from "@/shared/middlewares/validateSchema";
import { userLoginSchema, userRegisterSchema } from "@/modules/auth/auth.schema";
import { Router } from "express";
import { authMiddleware } from "@/shared/middlewares/authMiddleware";
import { asyncHandler } from "@/shared/utils/async-handler";
import { invitationSchema } from "./invitation.schema";

export const authRouter = Router();

authRouter.post("/signup", validateSchema(userRegisterSchema), asyncHandler(AuthController.signup));

authRouter.post("/login", validateSchema(userLoginSchema), asyncHandler(AuthController.login));

authRouter.get('/validate', authMiddleware, asyncHandler(AuthController.validateToken))

authRouter.post('/invite', validateSchema(invitationSchema), asyncHandler(AuthController.inviteEmployee))

authRouter.get('/invitations/validate', asyncHandler(AuthController.validateInvitation))

authRouter.post('/invitations/accept', asyncHandler(AuthController.acceptInvitation))