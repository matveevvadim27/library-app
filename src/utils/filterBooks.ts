import { Book } from "../schemas/bookSchema";

export const filterBooks = (books: Book[], searchQuery: string): Book[] => {
  if (!searchQuery.trim()) return [];

  return books.filter((book) =>
    [book.title, book.author, book.genre, book.publisher]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(searchQuery.toLowerCase()))
  );
};
