import { useBookStore } from "../../store/useBooksStore";
import styles from "./Library.module.scss";
import BooksList from "../../components/Shared/Books/BooksList/BooksList";
import { useBooks } from "hooks/useBooks";
import BookSearcher from "components/Shared/Books/BookSearcher/BookSearcher";

export default function Library() {
  const { books } = useBookStore();
  const { searchBook } = useBooks();

  return (
    <main className={styles.library}>
      <section className={`${styles.library__section} container`}>
        <h1 className={styles.library__title}>Библиотека</h1>
        <BookSearcher />
        <BooksList />
      </section>
    </main>
  );
}
