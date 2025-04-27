import { z } from "zod";

export type editFormData = z.infer<typeof editSchema>;

export const editSchema = z.object({
  id: z.number(),
  password: z.string().min(8, "Пароль должен быть не менее 8 символов"),
});
