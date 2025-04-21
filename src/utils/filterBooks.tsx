import { BookFormData } from "../schemas/bookSchema";

export const filterBooks = (
  books: BookFormData[],
  searchQuery: string
): BookFormData[] => {
  if (!searchQuery.trim()) return [];

  return books.filter((book) =>
    [book.name, book.author, book.genre, book.publisher].some((field) =>
      field.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
};
