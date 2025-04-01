import { getEnvKey } from "@/shared/utils/getEnvKey";

export const PORT: number = getEnvKey("PORT", 3000);
export const SALT_ROUNDS: number = getEnvKey("SALT_ROUNDS", 10)
export const KEY: string = getEnvKey("PUBLIC_JWK")
