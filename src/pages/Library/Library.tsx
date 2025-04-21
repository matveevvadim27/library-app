import { useBookStore } from "../../store/booksStore";
import styles from "./Library.module.scss";
import { filterBooks } from "../../utils/filterBooks";
import { useState } from "react";
import BookCard from "components/BookCard/BookCard";
import BookList from "components/Bookslist/Bookslist";

export default function Library() {
  const { books } = useBookStore();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const filteredBooks = filterBooks(books, searchQuery);

  return (
    <main className={styles.library}>
      <section className={`${styles.library__section} container`}>
        <h1 className={styles.library__title}>Библиотека</h1>
        <label className={styles.library__label}>
          Поиск:
          <input
            type="text"
            placeholder="Поиск по автору, жанру или издательству"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.library__input}
          />
        </label>
        {searchQuery.trim() !== "" && filteredBooks.length > 0 && (
          <h2 className={styles.library__empty}>Найденные книги</h2>
        )}
        <ul className={styles.library__list}>
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => <BookCard key={book.id} book={book} />)
          ) : searchQuery.trim() !== "" ? (
            <p>Ничего не найдено</p>
          ) : null}
        </ul>
        <BookList />
      </section>
    </main>
  );
}
