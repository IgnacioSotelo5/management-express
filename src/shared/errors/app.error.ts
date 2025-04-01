export class AppError extends Error{
    public readonly status: number

    constructor(message: string, statusCode: number){
        super(message)
        this.message = message
        this.status = statusCode
        //Asegura que la herencia funcione correctamente asignando el prototipo de la instancia explícitamente a un objeto nuevo
        //Evita problemas con instanceof al capturar errores
        Object.setPrototypeOf(this, new.target.prototype)
    }
}