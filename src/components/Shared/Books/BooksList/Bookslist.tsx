import { useBookStore } from "store/booksStore";
import BookCard from "../BookCard/BookCard";
import styles from "./BooksList.module.scss";
import { useEffect, useState } from "react";

export default function BookList() {
  const { books, setBooks } = useBookStore();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {};

    fetchUsers();
  }, [setBooks]);

  if (loading) return <p className="loading">Загрузка книг...</p>;
  if (error) return <p className="loading">{error}</p>;

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
