import { useBookStore } from "store/bookStore";
import BookCard from "../BookCard/BookCard";
import styles from "./booksList.module.scss";

export default function BookList() {
  const { books } = useBookStore();

  return !books || books.length === 0 ? (
    <h2 className={"booklist__empty"}>Список книг пуст</h2>
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
