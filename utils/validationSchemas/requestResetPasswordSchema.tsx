// utils/validationSchemas.ts
import * as z from 'zod';

export const requestResetPasswordSchema = z
  .object({
    email: z.string().min(1, "Email is required").email("Invalid email format")
  })

export type RequestResetPasswordFormData = z.infer<typeof requestResetPasswordSchema>;
