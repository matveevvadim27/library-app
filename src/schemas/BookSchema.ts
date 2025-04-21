import { z } from "zod";

export type BookFormData = z.infer<typeof bookSchema>;

export const bookSchema = z.object({
  id: z.number().optional(),
  name: z.string().nonempty("Название книги обязательно для заполнения!"),
  author: z.string().nonempty("Автор книги обязателен для заполнения!"),
  publisher: z
    .string()
    .nonempty("Издательство книги обязательно для заполнения!"),
  genre: z.string().nonempty("Жанр книги обязателен для заполнения!"),
  description: z.string(),
});
