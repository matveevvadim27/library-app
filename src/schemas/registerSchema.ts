import { z } from "zod";

export type RegisterFormData = z.infer<typeof registerSchema>;

export const registerSchema = z
  .object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(8, "Пароль должен быть не менее 8 символов"),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });
