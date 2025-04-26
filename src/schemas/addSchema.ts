import { z } from "zod";
import { Roles } from "constants/roles";

export type AddFormData = z.infer<typeof addSchema>;

export const addSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string().min(8, "Пароль должен быть не менее 8 символов"),
  role: z.nativeEnum(Roles),
});
