import { z } from "zod";

export const strongPasswordSchema = z.string()
  .min(8, "Must be at least 8 characters")
  .max(32, "Cannot exceed 32 characters")
  .regex(/[A-Z]/, "Must contain at least one uppercase letter")
  .regex(/[a-z]/, "Must contain at least one lowercase letter")
  .regex(/[0-9]/, "Must contain at least one number");
  

export const userRegisterSchema = z.object({
  id: z.string().uuid('Invalid user ID format. Must be a valid UUID.').optional(),
  name: z.string().trim().min(1, 'Name cannot be empty'),
  lastName: z.string().trim().min(1, 'Last name cannot be empty'),
  email: z.string().trim().toLowerCase().email(),
  role: z.enum(['ADMIN', 'EMPLOYEE', 'OWNER']),
  password: strongPasswordSchema,
  employeeAtId: z.string().uuid('Invalid bakery ID format. Must be a valid UUID.').nullable()
});

export const userLoginSchema = z.object({
  email: z.string().trim().toLowerCase().email('Must be a valid email'),
  password: z.string().min(1, 'Password is required')
});

export type userRegisterDTO = z.infer<typeof userRegisterSchema>;
export type userLoginDTO = z.infer<typeof userLoginSchema>
