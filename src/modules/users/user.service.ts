import { UserModel } from "./user.model"
import { User } from "./user.schema"
import { userRegisterDTO } from "../auth/auth.schema"
import { ConflictError } from "@/shared/errors/conflict.error"
import { BadRequestError } from "@/shared/errors/bad-request.error"

export class UserService{
    static async createUser({name, lastName, email, password, role, employeeAtId}: User): Promise<Omit<userRegisterDTO, "password">>{
        const userExists = await UserModel.findUserByEmail({email})

        if(userExists){
            throw new ConflictError(`User with email ${email} already exists`)
        }
        
        if(role !== 'EMPLOYEE' && role !== 'OWNER'){
            throw new BadRequestError('User role is required')
        }

        const user = await UserModel.createUser({name, lastName, email, password, role, employeeAtId})
        return user
    }
}