import { create } from "zustand";
import { IBook, IBookBase } from "../constants/booksRoutes";

export interface IRequstedBooks extends IBookBase {
  userId: number;
  userName: string;
}

interface IBooksStore {
  book: IBook | null;
  books: IBook[];
  searchedBooks: IBook[];
  requstedBooks: IRequstedBooks[];
  issuedBooks: IBook[];
  setBooks: (books: IBook[] | ((prev: IBook[]) => IBook[])) => void;
  setSearchedBooks: (
    searchedBooks: IBook[] | ((prev: IBook[]) => IBook[])
  ) => void;
  setRequstedBooks: (
    searchedBooks:
      | IRequstedBooks[]
      | ((prev: IRequstedBooks[]) => IRequstedBooks[])
  ) => void;
}

export const useBookStore = create<IBooksStore>((set) => ({
  book: null,

  books: [],

  searchedBooks: [],

  requstedBooks: [],

  issuedBooks: [],

  setBooks: (books) =>
    set((state) => {
      const newBooks = typeof books === "function" ? books(state.books) : books;
      const issuedBooks = newBooks.filter((book) => book.take_at);

      const validBookIds = newBooks.map((book) => book.id);
      const updatedRequestedBooks = state.requstedBooks.filter((book) =>
        validBookIds.includes(book.id)
      );
      return {
        books: newBooks,
        issuedBooks,
        requstedBooks: updatedRequestedBooks,
      };
    }),

  setSearchedBooks: (searchedBooks) =>
    set((state) => ({
      searchedBooks:
        typeof searchedBooks === "function"
          ? searchedBooks(state.searchedBooks)
          : searchedBooks,
    })),

  setRequstedBooks: (requstedBooks) =>
    set((state) => ({
      requstedBooks:
        typeof requstedBooks === "function"
          ? requstedBooks(state.requstedBooks)
          : requstedBooks,
    })),
}));
