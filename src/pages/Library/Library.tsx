import { useBookStore } from "../../store/booksStore";
import styles from "./Library.module.scss";
import { useState } from "react";
import BookList from "../../components/Shared/Books/BooksList/Bookslist";

export default function Library() {
  const { books } = useBookStore();
  const [searchQuery, setSearchQuery] = useState<string>("");

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
        <BookList />
      </section>
    </main>
  );
}
