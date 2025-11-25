import { z } from "zod";

export const idParamSchema = z.object({
    id: z.string().uuid('Invalid ID format. Must be a valid UUID.')
})

export const nameParamSchema = z.object({
    name: z.string().min(1, 'Name must be provided as param.')
})