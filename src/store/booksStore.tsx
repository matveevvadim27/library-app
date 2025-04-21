import { create } from "zustand";
import { BookFormData } from "../schemas/bookSchema";

interface IBooksStore {
  book: BookFormData | null;
  books: BookFormData[];
  setBooks: (
    books: BookFormData[] | ((prev: BookFormData[]) => BookFormData[])
  ) => void;
}

export const useBookStore = create<IBooksStore>((set) => ({
  book: null,
  books: [],
  setBooks: (books) =>
    set((state) => ({
      books: typeof books === "function" ? books(state.books) : books,
    })),
}));
