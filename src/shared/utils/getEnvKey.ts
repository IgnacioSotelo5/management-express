export function getEnvKey<T extends string | number | boolean>(key: string, defaultValue?: T): T {
    const envKey = process.env[key];
    if (!envKey) {
        if(defaultValue === undefined){
            throw new Error(`Environment variable ${key} is not defined`);
        }
        return defaultValue
    }

    if(typeof defaultValue === "number"){
        if(isNaN(Number(envKey))){
            throw new Error(`Environment variable ${key} is not a number`)
        }
        return Number(envKey) as T
    }

    if(typeof defaultValue === "boolean"){
        return (envKey.toLowerCase() === "true") as T
    }
    return envKey as T;
}