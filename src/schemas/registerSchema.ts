import { UserRole } from "../constants/UserRoles";
import { z } from "zod";

export type User = z.infer<typeof registerSchema>;

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Имя должно быть не менее 3 символов!")
    .regex(
      /^[A-Za-zА-Яа-яЁё0-9]+$/,
      "Имя может содержать только буквы и числа!"
    ),
  password: z
    .string()
    .min(3, "Пароль должен быть не менее 3 символов!")
    .max(12, "Пароль не должен превышать 12 символов!")
    .regex(
      /^[A-Za-z0-9]+$/,
      "Пароль может содержать только латинские буквы и цифры!"
    ),
  confirmPassword: z.string(),
  role: z.enum([UserRole.Admin, UserRole.Librarian, UserRole.Client]),
});
