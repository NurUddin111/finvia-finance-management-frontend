import { z } from "zod";

export const createInvoiceSchema = z.object({
  email: z.email("Please enter a valid email address"),

  dueDays: z.number().min(0, "Due days cannot be negative"),

  taxRate: z
    .number()
    .min(0, "Tax rate cannot be negative")
    .max(100, "Tax rate cannot exceed 100%"),

  method: z.enum(["ONLINE", "CASH"], {
    error: "Invalid payment method",
  }),

  notes: z.string().max(500, "Notes cannot exceed 500 characters").optional(),

  items: z
    .array(
      z.object({
        productId: z.string().min(1, "Please select a product"),

        name: z.string().optional(),

        pricePerUnit: z.number().positive("Price must be greater than 0"),

        quantity: z
          .number()
          .int("Quantity must be a whole number")
          .positive("Quantity must be greater than 0"),
      }),
    )
    .min(1, "At least one item is required"),
});

export type CreateInvoicePayload = z.infer<typeof createInvoiceSchema>;
