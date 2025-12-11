import { z } from "zod";

const strongPasswordSchema = z.string()
  .min(8, "Must be at least 8 characters")
  .max(32, "Cannot exceed 32 characters")
  .regex(/[A-Z]/, "Must contain at least one uppercase letter")
  .regex(/[a-z]/, "Must contain at least one lowercase letter")
  .regex(/[0-9]/, "Must contain at least one number");


export const userRegisterSchema = z.object({
  name: z.string().trim().min(1, 'Name cannot be empty'),
  lastName: z.string().trim().min(1, 'Last name cannot be empty'),
  email: z.string().trim().toLowerCase().email(),
  role: z.enum(['ADMIN', 'EMPLOYEE', 'OWNER']),
  password: strongPasswordSchema,
  employeeAtId: z.string().uuid('Invalid bakery ID format. Must be a valid UUID.').nullable()
})

export const userSchema = z.object({
    id: z.string().uuid('Invalid user ID format. Must be a valid UUID.').optional(),
    name: z.string().min(1, 'Name cannot be empty'),
    lastName: z.string().min(1, 'Last name cannot be empty'),
    email: z.string().email('Must be a valid email'),
    role: z.enum(['ADMIN', 'EMPLOYEE', 'OWNER']),
    password: strongPasswordSchema,
    employeeAtId: z.string().uuid('Invalid bakery ID format. Must be a valid UUID.').nullable()
})

export type User = z.infer<typeof userSchema>
export type UserRegister = z.infer<typeof userRegisterSchema>