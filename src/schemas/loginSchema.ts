import { z } from "zod";

export type loginFormData = z.infer<typeof loginSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Пароль должен быть не менее 8 символов"),
});
