import { createContext, useState, useContext, useEffect } from "react";

const BooksContext = createContext();

export function BooksProvider({ children }) {
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem("books");
    return JSON.parse(savedBooks);
  });

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  const addBook = (newBook) => {
    setBooks((prevBooks) => [
      ...(prevBooks || []),
      { id: Date.now(), ...newBook },
    ]);
  };

  const removeBook = (id) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  return (
    <BooksContext.Provider value={{ books, addBook, removeBook }}>
      {children}
    </BooksContext.Provider>
  );
}

export function useBooks() {
  return useContext(BooksContext);
}
