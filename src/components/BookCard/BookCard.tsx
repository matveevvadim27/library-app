import api from "../../api/api";
import { BookFormData } from "../../schemas/bookSchema";
import { useAuthStore } from "store/authStore";
import styles from "./BookCard.module.scss";
import { toast } from "react-toastify";
import { useBookStore } from "store/booksStore";

interface BookCardProps {
  book: BookFormData;
}

export default function BookCard({ book }: BookCardProps) {
  const { currentUser } = useAuthStore();
  const { books, setBooks } = useBookStore();

  const handleDeleteBook = async (book: number) => {
    try {
      await api.delete(`/books/${book}`);
      setBooks((prev) => prev.filter((u) => u.id !== book));
      toast.success("Книга успешно удалена!");
    } catch (err) {
      toast.error("Ошибка при удалении книги!");
    }
  };
  return (
    <li className={styles.card}>
      <div className={styles.card__content}>
        <h3 className="card__text">{book.name}</h3>
        <p className="card__text">Автор: {book.author}</p>
        <p className="card__text">Издатель: {book.publisher}</p>
        <p className="card__text">Жанр: {book.genre}</p>
        <p className="card__text">
          Описание: {book.description || "Нет описания"}
        </p>
        {currentUser!.role <= 2 && (
          <div className={styles.card__actions}>
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
