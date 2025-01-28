// utils/validationSchemas.ts
import * as z from 'zod';

export const editProfileSchema = z
  .object({
    userId: z.string(),
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must be less than 50 characters"),
    telephone: z.string().min(2, "Telephone must be at least").max(15, "Telephone must be below 15 characters")
  })
export type EditProfileFormData = z.infer<typeof editProfileSchema>;
