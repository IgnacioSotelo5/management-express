import { jwtVerify } from "jose"
import { getEnvKey } from "./getEnvKey"

export async function verifyJWTToken(token: string) {
    const SECRET: string = getEnvKey("PRIVATE_JWK")
    const secret = new TextEncoder().encode(SECRET)

    try {
        const {payload, protectedHeader} = await jwtVerify(
            token,
            secret,
            { 
                algorithms: ["HS256"],
                issuer: "http://localhost:3000", 
                audience: "http://localhost:3000" 
            }
        )
        return { payload, protectedHeader }
    } catch (error) {
        console.error("Error verifying token: ", error)
    }
}