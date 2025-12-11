import z from "zod";
import { strongPasswordSchema } from "./auth.schema";

export const invitationSchema = z.object({
    email: z.string().trim().toLowerCase().email('Must be a valid email'),
    name: z.string().trim().min(1, 'Name cannot be empty'),
    bakeryId: z.string().uuid('Invalid bakery ID format. Must be a valid UUID.'),
    role: z.enum(['EMPLOYEE']),
    expiresAt: z.coerce.date().refine((date) => date > new Date(), { message: "Expiration date must be in the future" })
})

export const acceptInvitationSchema = z.object({
    id: z.string().uuid('Invalid invitation ID format. Must be a valid UUID.'),
    token: z.string().optional(),
    lastName: z.string().trim().min(1, 'Last name cannot be empty'),
    password: strongPasswordSchema
})