import { Book } from "context/BooksContext";

export const filterBooks = (books: Book[], searchQuery: string): Book[] => {
  if (!searchQuery.trim()) return [];

  return books.filter((book) =>
    [book.title, book.author, book.genre, book.publisher]
      .filter(Boolean)
      .some((field) => field.toLowerCase().includes(searchQuery.toLowerCase()))
  );
};
