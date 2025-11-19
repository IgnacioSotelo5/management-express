import { UserService } from "@/modules/users/user.service";
import { userLoginDTO, userRegisterDTO } from "./auth.schema";
import { UserModel } from "@/modules/users/user.model";
import bcrypt from 'bcrypt'
import { UnauthorizedError } from "@/shared/errors/unauthorized.error";
import { genJWTToken } from "@/shared/utils/genToken";

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
}