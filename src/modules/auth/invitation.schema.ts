import z from "zod";

export const invitationSchema = z.object({
    email: z.string().trim().toLowerCase().email('Must be a valid email'),
    name: z.string().trim().min(1, 'Name cannot be empty'),
    bakeryId: z.string().uuid('Invalid bakery ID format. Must be a valid UUID.'),
    role: z.enum(['employee']),
    expiresAt: z.coerce.date().refine((date) => date > new Date(), { message: "Expiration date must be in the future" })
})