import { ObjectId } from "mongodb";
import { z } from "zod";

const strongPasswordSchema = z.string()
  .min(8, "Must be at least 8 characters")
  .max(32, "Cannot exceed 32 characters")
  .regex(/[A-Z]/, "Must contain at least one uppercase letter")
  .regex(/[a-z]/, "Must contain at least one lowercase letter")
  .regex(/[0-9]/, "Must contain at least one number");

export const userRegisterSchema = z.object({
  id: z.string().refine((val) => ObjectId.isValid(val)).optional(),
  name: z.string().trim().min(1, 'Name cannot be empty'),
  lastName: z.string().trim().min(1, 'Last name cannot be empty'),
  email: z.string().trim().toLowerCase().email(),
  role: z.string().refine((val) => (['admin', 'user'].includes(val))).optional(),
  password: strongPasswordSchema
});

export const userLoginSchema = z.object({
  email: z.string().trim().toLowerCase().email('Must be a valid email'),
  password: z.string().min(1, 'Password is required')
});

export type userRegisterDTO = z.infer<typeof userRegisterSchema>;
export type userLoginDTO = z.infer<typeof userLoginSchema>
