import { AppError } from "./app.error";

export class GoneError extends AppError{
    constructor(message = 'The resource you are trying to access is no longer available.'){
        super(message, 410)
    }
}