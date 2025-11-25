import { z } from "zod";

export const supplierSchema = z.object({
  id: z.string().uuid('Invalid ID format. Must be a valid UUID.').optional(),
  name: z.string().trim().min(1, 'Name is required'),
  phoneNumber: z
  .string()
  .min(5, 'Phone number must have at least 5 digits')
  .max(20, 'Phone number must be shorter than 20 digits')
  .nullable()
  .refine((val) => {
     if (val === null) return true;
     return /^\+?[0-9\s-]+$/.test(val); 
  }, { message: 'Invalid phone number format' }),
  userId: z.string().uuid('Invalid user ID format. Must be a valid UUID.').optional(),
})

export const updateSupplierSchema = supplierSchema.partial()

export type SupplierSchema = z.infer<typeof supplierSchema>
export type UpdateSupplier = z.infer<typeof updateSupplierSchema>
