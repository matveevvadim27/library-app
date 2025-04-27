import { useAuthStore } from "store/useAuthStore";
import styles from "./BookCard.module.scss";
import { useBookStore } from "store/useBooksStore";
import { useBooks } from "hooks/useBooks";
import { IBook, IBookBase } from "constants/booksRoutes";
import { toast } from "react-toastify";

interface IBookCardProps {
  book: IBook;
}

export default function BookCard({ book }: IBookCardProps) {
  const { user } = useAuthStore();
  const { deleteBook, putReserveBook, putFreeBook } = useBooks();
  const { setRequstedBooks } = useBookStore();

  const handleDeleteBook = async (id: number) => {
    deleteBook(id);
  };

  const handleReservationBook = async (slug: string) => {
    const id = user!.id;
    putReserveBook(slug, id);
  };

  const handleFreeBook = async (slug: string) => {
    putFreeBook(slug);
  };

  const handleRequestBook = (
    data: IBookBase,
    userId: number,
    userName: string
  ) => {
    const requstedBookData = {
      ...data,
      userId,
      userName,
    };
    setRequstedBooks([requstedBookData]);
    toast.success("Запрос на выдачу книги отправлен");
  };

  return (
    <li className={styles.card}>
      <div className={styles.card__content}>
        <div className={styles.card__info}>
          <h3 className="card__text">{book.name}</h3>
          <p className={styles.card__info__reservation}>
            {book.reserved_at !== null &&
              `Книга зарезервирована: ${book.reserved_at}`}
          </p>
        </div>
        <p className="card__text">Автор: {book.author}</p>
        <p className="card__text">Издатель: {book.publisher}</p>
        <p className="card__text">Жанр: {book.genre}</p>
        <p className="card__text">
          Описание: {book.description || "Нет описания"}
        </p>
        {user!.role! == 3 && (
          <button
            className={styles.card__reservation}
            onClick={() => handleRequestBook(book, user!.id, user!.name)}
          >
            Запросить книгу
          </button>
        )}
        {user!.role! <= 2 && (
          <div className={styles.card__actions}>
            {book.reserved_at !== null ? (
              <button
                className={styles.card__reservation}
                onClick={() => handleFreeBook(book.slug)}
              >
                Снять бронь
              </button>
            ) : (
              <button
                className={styles.card__reservation}
                onClick={() => handleReservationBook(book.slug)}
              >
                Зарезервировать
              </button>
            )}
            <button
              className={styles.card__delete}
              onClick={() => handleDeleteBook(book.id!)}
            >
              Удалить
            </button>
          </div>
        )}
      </div>
    </li>
  );
}
