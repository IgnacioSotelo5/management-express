import { AppError } from "./app.error";

export class ForbiddenError extends AppError{
    constructor(message = 'You do not have permission to access or modify this resource.'){
        super(message, 403)
    }
}