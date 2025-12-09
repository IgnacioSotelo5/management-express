import { UserService } from "@/modules/users/user.service";
import { userLoginDTO, userRegisterDTO } from "./auth.schema";
import { UserModel } from "@/modules/users/user.model";
import bcrypt from 'bcrypt'
import { UnauthorizedError } from "@/shared/errors/unauthorized.error";
import { genJWTToken } from "@/shared/utils/genToken";
import { randomUUID } from "crypto";
import { BASE_URL, SALT_ROUNDS } from "@/config/config";
import { BadRequestError } from "@/shared/errors/bad-request.error";
import { NotFoundError } from "@/shared/errors/not-found.error";
import { GoneError } from "@/shared/errors/gone-error";
import { ConflictError } from "@/shared/errors/conflict.error";

export class AuthService{
    static async signup({name, lastName, email, password}: userRegisterDTO){
        const newUser: Omit<userRegisterDTO, "password"> = await UserService.createUser({name, lastName, email, password})
        const payload = {
            userId: newUser.id,
            email: newUser.email,
            role: newUser.role,
        }
        const token = await genJWTToken(payload, "1h")
        return {user: newUser, token}
    }

    static async login({email, password}: userLoginDTO){
        const user = await UserModel.findUserByEmail({email})
        if (!user) {
            throw new UnauthorizedError(`Wrong credentials. User not found.`);
        }
        const {password: _, ...sanitizedUser} = user;    
        const passwordMatch = await bcrypt.compare(password, user.password)
    
        if(!passwordMatch){
            throw new UnauthorizedError("Invalid password")
        }
    
        const payload = {
            userId: user.id,
            email: user.email,
            role: user.role
        }
    
        const token = await genJWTToken(payload, "1h")
        return {sanitizedUser, token}
        
    }

    static async inviteEmployee({ email, name, bakeryId, role, expiresAt }: { email: string; name: string; bakeryId: string; role: string; expiresAt: Date }) {
        if(!name || !email || !bakeryId || !role || !expiresAt){
            throw new BadRequestError('Missing required fields for invitation.')
        }
        const existingInvitation = await UserModel.existsInvitation({ email, bakeryId });
        if (existingInvitation) {
            throw new BadRequestError(`An invitation for ${email} to bakery ${bakeryId} already exists.`);
        }

        const token = randomUUID()
        const hashedToken = await bcrypt.hash(token, SALT_ROUNDS)

        const invitation = await UserModel.createInvitation({ email, name, bakeryId, role, token: hashedToken, expiresAt})

        const invitationLink = `${BASE_URL}/invitations/accept?token=${token}`

        return {
            invitation: {
                invitationId: invitation.id,
                email: invitation.email,
                name: invitation.name,
                bakeryId: invitation.bakeryId,
                expiresAt: invitation.expiresAt,
            },
            invitationLink
        }
    }

    static async validateInvitation(token?: string) {
        if(!token){
            throw new BadRequestError('Invitation token is required.')
        }
        const invitation = await UserModel.findInvitationByToken(token)

        if(!invitation) {
            throw new NotFoundError('Invitation not found.')
        }

        if(invitation.used){
            throw new ConflictError('Invitation has already been used.')
        }

        if(invitation?.expiresAt < new Date()){
            throw new GoneError('Invitation has expired.')
        }

        return invitation !== null;
    }

    static async acceptInvitation(token?: string) {}
}