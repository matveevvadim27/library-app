import { useBookStore } from "store/useBooksStore";
import BookCard from "../BookCard/BookCard";
import styles from "./BooksList.module.scss";
import { useEffect } from "react";
import { useBooks } from "hooks/useBooks";

export default function BooksList() {
  const { getBooks } = useBooks();
  const { books, setBooks } = useBookStore();

  useEffect(() => {
    getBooks();
  }, [setBooks]);

  return !books || books.length === 0 ? (
    <h2 className={styles.books__empty}>Список книг пуст</h2>
  ) : (
    <div className={styles.books__body}>
      <h2 className={styles.books__title}>Список книг</h2>
      <ul className={styles.books__list}>
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </ul>
    </div>
  );
}
