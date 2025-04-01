import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "@/config/config";
import prisma from "@/config/prisma";
import { userRegisterDTO } from "@/modules/auth/auth.schema";
import { NotFoundError } from "@/shared/errors/not-found.error";

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
}