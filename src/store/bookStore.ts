import { create } from "zustand";
import { Book } from "../schemas/BookSchema";

export interface BooksStore {
  books: Book[];
  addBook: (book: Book) => void;
  removeBook: (id: number) => void;
}
export const useBookStore = create<BooksStore>((set) => ({
  books: [],
  addBook: (book) =>
    set((state) => ({ books: [...state.books, { id: Date.now(), ...book }] })),
  removeBook: (id) =>
    set((state) => ({ books: state.books.filter((book) => book.id !== id) })),
}));
