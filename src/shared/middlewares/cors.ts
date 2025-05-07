import cors, { CorsOptions } from 'cors'

const whitelist = [
    'http://localhost:8081', 
]

const corsOptions: CorsOptions = {
    origin: (origin, callback) => {  
        if(!origin){
            //permitir requests sin origen (como desde apps moviles nativas o Postman)
            callback(null, true)
        } else if(whitelist.includes(origin)){
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
export const corsMiddleware = () => cors(corsOptions)
