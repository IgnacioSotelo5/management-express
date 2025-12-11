import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";

export class AuthController{
    static async signup (req: Request, res: Response, next: NextFunction): Promise <void>{
        const { name, lastName, email, password, role } = req.body;
        const newUser = await AuthService.signup({name, lastName, email, password, role: "OWNER", employeeAtId: null})
            
        res.status(201).json({success: true, data: {
            message: 'User created successfully',
            user: newUser.user,
            token: newUser.token
        }})
    }

    static async login (req: Request, res: Response, next: NextFunction): Promise<void>{
        const { email, password } = req.body
        
        const {sanitizedUser: user, token} = await AuthService.login({email, password})

        
        res.status(200).json({success: true, data: {
            message: 'User logged in successfully', 
            user, 
            token
        }})        
    }

    static async validateToken(req: Request, res: Response, next: NextFunction) {
        res.json({
            success: true,
            message: "Access allowed",
            user: req.user
        })
    }

    static async inviteEmployee(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { email, name, bakeryId, role, expiresAt } = req.body
        const invitation = await AuthService.inviteEmployee({ email, name, bakeryId, role, expiresAt})

        res.status(201).json({
            success: true,
            message: "Invitation created successfully",
            invitation
        })
    }
    
    static async acceptInvitation(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { token, id } = req.query as { token: string, id: string }
        const { lastName, password } = req.body

        const result = await AuthService.acceptInvitation({ id, token, lastName, password })

        res.status(201).json({
            success: true,
            message: "Invitation accepted successfully",
            user: result.user,
            token: result.token
        })
    }

    static async validateInvitation(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { token, id } = req.query as { token: string, id: string }
        const result = await AuthService.validateInvitation(id, token)

        res.status(200).json({
            success: true,
            message: "Invitation is valid",
            isValid: result
        })
    }

}
