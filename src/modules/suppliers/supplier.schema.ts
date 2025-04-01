import { ObjectId } from "mongodb";
import { z } from "zod";

export const SupplierSchema = z.object({
    id: z.string().refine((val) => ObjectId.isValid(val)).optional(),
    name: z.string(),
    phoneNumber: z.string().nullable()
})


export type Supplier = z.infer<typeof SupplierSchema>