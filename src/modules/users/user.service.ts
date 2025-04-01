import { UserModel } from "./user.model"
import { User } from "./user.schema"
import { userRegisterDTO } from "../auth/auth.schema"
import { ConflictError } from "@/shared/errors/conflict.error"

export class UserService{
    static async createUser({name, lastName, email, password}: User): Promise<Omit<userRegisterDTO, "password">>{
        const userExists = await UserModel.findUserByEmail({email})

        if(userExists){
            throw new ConflictError(`User with email ${email} already exists`)
        }
        
        const user = await UserModel.createUser({name, lastName, email, password})
        return user
    }
}