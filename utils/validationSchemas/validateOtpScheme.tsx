// utils/validationSchemas.ts
import * as z from 'zod';

export const validateOtpSchema = z
  .object({
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    otp: z.string().min(1, "Password is required").max(6, "max length of otp")
  })

export type ValidateOtpFormData = z.infer<typeof validateOtpSchema>;
