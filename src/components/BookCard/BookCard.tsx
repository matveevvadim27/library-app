import { useBookStore } from "store/bookStore";
import { Book } from "../../schemas/bookSchema";
import { useAuthStore } from "store/authStore";
import styles from "./bookCard.module.scss";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const { user } = useAuthStore();
  const { removeBook } = useBookStore();

  const handleDelete = () => {
    if (!book || book.id === undefined) return;
    if (window.confirm(`Удалить книгу "${book.title}"?`)) {
      removeBook(book.id);
    }
  };
  return (
    <li className={styles.card}>
      <img
        className={styles.card__image}
        src={book.image || "./placeholder.png"}
        alt={book.title}
        loading="lazy"
      />
      <div className={styles.card__content}>
        <h3 className="card__text">{book.title}</h3>
        <p className="card__text">Автор: {book.author}</p>
        <p className="card__text">Издатель: {book.publisher}</p>
        <p className="card__text">Жанр: {book.genre}</p>
        <p className="card__text">
          Описание: {book.description || "Нет описания"}
        </p>
        {(user?.role === "admin" || user?.role === "librarian") && (
          <div className={styles.card__actions}>
            <button className={styles.card__delete} onClick={handleDelete}>
              Удалить
            </button>
          </div>
        )}
      </div>
    </li>
  );
}
