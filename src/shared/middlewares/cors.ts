import cors, { CorsOptions } from 'cors'

const whitelist = [
    'exp://192.168.0.118:8081',
    'exp://192.168.0.114:8081',
    'http://localhost:8081', 
    'exp://192.168.1.125:8081'
]

const corsOptions: CorsOptions = {
    origin: (origin, callback) => {        
        if(!origin || whitelist.indexOf(origin) !== -1){
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
export const corsMiddleware = () => cors(corsOptions)
