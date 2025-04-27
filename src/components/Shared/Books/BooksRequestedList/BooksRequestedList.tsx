import { useBookStore } from "store/useBooksStore";
import styles from "./BooksRequestedList.module.scss";
import { useBooks } from "hooks/useBooks";
import { useAuthStore } from "store/useAuthStore";

export default function BooksRequestedList() {
  const { issuedBooks, requstedBooks, deleteRequestedBook } = useBookStore();
  const { putTakeBook, putReturnBook } = useBooks();
  const { user } = useAuthStore();

  const handleTakeBook = async (slug: string, id: number) => {
    await putTakeBook(slug, id);
  };

  const handleReturnBook = async (slug: string) => {
    await putReturnBook(slug);
  };

  return (
    <>
      {requstedBooks.length == 0 ? (
        <p>Список запрошенных книг пуст</p>
      ) : (
        <ul className={styles.requested}>
          <h2 className={styles.requested__title}>Запрошенные книги</h2>
          {requstedBooks.map((book) => (
            <li key={book.id} className={styles.requested__item}>
              <div className={styles.requested__info}>
                <h3 className={styles.requested__text}>{book.name}</h3>
                <p className={styles.requsted_name}>
                  Книгу запросил: {book.userName}
                </p>
              </div>
              <p className={styles.requested__text}>Автор: {book.author}</p>
              <p className={styles.requested__text}>
                Издатель: {book.publisher}
              </p>
              <p className={styles.requested__text}>Жанр: {book.genre}</p>
              <p className={styles.requested__text}>
                Описание: {book.description || "Нет описания"}
              </p>
              <button
                className={styles.requested__btn}
                onClick={() => {
                  handleTakeBook(book.slug, user!.id);
                  deleteRequestedBook(book.id);
                }}
              >
                Выдать книгу
              </button>
            </li>
          ))}
        </ul>
      )}
      {issuedBooks.length == 0 ? (
        <p>Список книг на возврат пуст</p>
      ) : (
        <ul className={styles.requested}>
          <h2 className={styles.requested__title}>Книги на возврат</h2>
          {issuedBooks.map((book) => (
            <li key={book.id} className={styles.requested__item}>
              <div className={styles.requested__info}>
                <h3 className={styles.requested__text}>{book.name}</h3>
              </div>
              <p className={styles.requested__text}>Автор: {book.author}</p>
              <p className={styles.requested__text}>
                Издатель: {book.publisher}
              </p>
              <p className={styles.requested__text}>Жанр: {book.genre}</p>
              <p className={styles.requested__text}>
                Описание: {book.description || "Нет описания"}
              </p>
              <button
                className={styles.requested__btn}
                onClick={() => handleReturnBook(book.slug)}
              >
                Книга возвращена
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
