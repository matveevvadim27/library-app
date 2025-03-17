import { z } from "zod";

export type TLoginFormData = z.infer<typeof loginSchema>;

export const loginSchema = z.object({
  name: z.string().min(3, "Имя должно быть не менее 3 символов!"),
  password: z.string().min(3, "Пароль должен быть не менее 3 символов!"),
});
