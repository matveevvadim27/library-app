import { UserRole } from "../constants/UserRoles";
import { z } from "zod";

export type User = z.infer<typeof userSchema>;

export const userSchema = z.object({
  name: z.string().min(3, "Имя должно быть не менее 3 символов!"),
  password: z
    .string()
    .min(3, "Пароль должен быть не менее 3 символов!")
    .max(20, "Пароль не должен быть больше 20 символов!"),
  role: z.enum([UserRole.Admin, UserRole.Librarian, UserRole.Client]),
});
