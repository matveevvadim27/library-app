import { z } from "zod";

export const bookSchema = z.object({
  id: z.number().optional(),
  title: z.string().nonempty("Название книги обязательно"),
  author: z.string().nonempty("Автор обязателен"),
  publisher: z.string().nonempty("Издатель обязателен"),
  genre: z.string().nonempty("Жанр обязателен"),
  description: z
    .string()
    .max(300, "Текст должен сожержать не больше 300 символов")
    .optional(),
  image: z.string().optional(),
});

export type Book = z.infer<typeof bookSchema>;
