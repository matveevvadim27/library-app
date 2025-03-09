import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

export type Book = {
  id?: number;
  title: string;
  author: string;
  publisher: string;
  genre: string;
  image: string;
  description: string;
};

export interface BooksContextType {
  book: Book;
  books: Book[];
  setBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  addBook: (newBook: Book) => void;
  removeBook: (id: number) => void;
}

interface BooksProviderProps {
  children: ReactNode;
}

const defaultBook: Book = {
  id: 0,
  title: "",
  author: "",
  publisher: "",
  genre: "",
  image: "",
  description: "",
};

const BooksContext = createContext<BooksContextType>({} as BooksContextType);

export function BooksProvider({ children }: BooksProviderProps) {
  const [book, setBook] = useState<Book>(defaultBook);
  const [books, setBooks] = useState<Book[]>(() => {
    const savedBooks = localStorage.getItem("books");
    return savedBooks ? (JSON.parse(savedBooks) as Book[]) : [];
  });

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const addBook = (newBook: Book) => {
    setBooks((prevBooks) => [...prevBooks, { id: Date.now(), ...newBook }]);
  };

  const removeBook = (id: number) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  return (
    <BooksContext.Provider
      value={{ book, books, setBooks, addBook, removeBook }}
    >
      {children}
    </BooksContext.Provider>
  );
}

export function useBooks() {
  return useContext(BooksContext);
}
