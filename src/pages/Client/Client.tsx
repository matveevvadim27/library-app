import { useBookStore } from "store/bookStore";
import { useState } from "react";
import { filterBooks } from "../../utils/filterBooks";
import BooksList from "../../components/Bookslist/Bookslist";
import BookCard from "../../components/BookCard/BookCard";
import styles from "./client.module.scss";

export default function ClientPage() {
  const { books } = useBookStore();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const filteredBooks = filterBooks(books, searchQuery);

  return (
    <main className={styles.client}>
      <section className={`${styles.client__section} container`}>
        <h1>Библиотека</h1>
        <label className={styles.client__label}>
          Поиск:
          <input
            type="text"
            placeholder="Поиск по автору, жанру или издательству"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.client__input}
          />
        </label>
        {searchQuery.trim() !== "" && filteredBooks.length > 0 && (
          <h2>Найденные книги</h2>
        )}
        <ul className={styles.books__list}>
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => <BookCard key={book.id} book={book} />)
          ) : searchQuery.trim() !== "" ? (
            <p>Ничего не найдено</p>
          ) : null}
        </ul>
        <BooksList />
      </section>
    </main>
  );
}
