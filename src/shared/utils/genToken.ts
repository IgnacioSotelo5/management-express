import { createSecretKey } from "crypto";
import { SignJWT, JWTPayload, importJWK } from "jose";
import { getEnvKey } from "./getEnvKey";


const DOMAIN: string = getEnvKey("DOMAIN", "http://localhost:3000")
const SECRET: string = getEnvKey("PRIVATE_JWK")

if (!SECRET) {
    throw new Error("Secret key is not provided");
}

export function genJWTToken(payload: JWTPayload, expiresIn: string) {
    const secret = new TextEncoder().encode(SECRET)

    return new SignJWT(payload)
    .setExpirationTime(expiresIn)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuer(DOMAIN)
    .setAudience(DOMAIN)
    .sign(secret)

}