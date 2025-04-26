import { useBookStore } from "store/useBooksStore";
import styles from "./BooksRequestedList.module.scss";
import { useBooks } from "hooks/useBooks";
import { useAuthStore } from "store/useAuthStore";

export default function BooksRequestedList() {
  const { books, issuedBooks, requstedBooks } = useBookStore();
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
      <ul className={styles.requested}>
        {requstedBooks.map((book) => (
          <li key={book.id}>
            <div className={styles.requsted__info}>
              <h3 className="card__text">{book.name}</h3>
              <p className={styles.requsted_name}>
                Книгу запросил: {book.userName}
              </p>
            </div>
            <p className="card__text">Автор: {book.author}</p>
            <p className="card__text">Издатель: {book.publisher}</p>
            <p className="card__text">Жанр: {book.genre}</p>
            <p className="card__text">
              Описание: {book.description || "Нет описания"}
            </p>
            <button
              className={styles.requsted__btn}
              onClick={() => handleTakeBook(book.slug, user!.id)}
            >
              Выдать книгу
            </button>
          </li>
        ))}
      </ul>
      <ul>
        {issuedBooks.map((book) => (
          <li key={book.id}>
            <div className={styles.requsted__info}>
              <h3 className="card__text">{book.name}</h3>
            </div>
            <p className="card__text">Автор: {book.author}</p>
            <p className="card__text">Издатель: {book.publisher}</p>
            <p className="card__text">Жанр: {book.genre}</p>
            <p className="card__text">
              Описание: {book.description || "Нет описания"}
            </p>
            <button
              className={styles.requsted__btn}
              onClick={() => handleReturnBook(book.slug)}
            >
              Книга возвращена
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
