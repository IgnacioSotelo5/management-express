import { AppError } from "./app.error";

export class ConflictError extends AppError{
    constructor(message= 'Conflict error'){
        super(message, 409 )
    }
}