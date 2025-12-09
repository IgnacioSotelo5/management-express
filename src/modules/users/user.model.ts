import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "@/config/config";
import { prisma } from "@/db/client";

import { userRegisterDTO } from "@/modules/auth/auth.schema";
type Invitation = Parameters<typeof prisma.invitation.create>[0]["data"]

export class UserModel{
    static async createUser({name, lastName, email, password, role = "admin"}: userRegisterDTO){
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        
        const newUser = await prisma.user.create({
            data: {
                name,
                lastName,
                email,
                password: hashedPassword,
                role,
            },
        });        

        const { password: _, ...user } = newUser;

        return user
    }

    static async findUserByEmail({email}:{email: string}){
        return await prisma.user.findUnique({
            where: {
                email
            }
        }) || null;
    }

    static async createInvitation({ email, name, bakeryId, role, token, expiresAt }: Invitation & { bakeryId: string }): Promise<Invitation> {
        const invitation = await prisma.invitation.create({
            data: {
                email,
                name,
                bakeryId,
                role,
                token,
                expiresAt
            }
        })
        return invitation
    }

    static async existsInvitation({ email, bakeryId }: { email: string; bakeryId: string }): Promise<boolean> {
        const invitation = await prisma.invitation.findFirst({
            where: {
                email, 
                bakeryId
            }
        })
        return invitation !== null;
    }

    static async findInvitationByToken(token: string): Promise<Invitation | null> {
        const invitation = await prisma.invitation.findFirst({
            where: {
                token
            }
        })
        return invitation;
    }

}