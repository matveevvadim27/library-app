import { useBooks, Book } from "../../context/BooksContext";
import { useAuth, User } from "../../context/AuthContext";

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  const { user } = useAuth();
  const { removeBook } = useBooks();

  const handleDelete = () => {
    if (!book || book.id === undefined) return;
    if (window.confirm(`Удалить книгу "${book.title}"?`)) {
      removeBook(book.id);
    }
  };
  return (
    <li className="books__card card">
      <img
        className="card__image"
        src={book.image || "./placeholder.png"}
        alt={book.title}
        loading="lazy"
      />
      <div className="card__content">
        <h3 className="card__title">{book.title}</h3>
        <p className="card__author">Автор: {book.author}</p>
        <p className="card__publisher">Издатель: {book.publisher}</p>
        <p className="card__genre">Жанр: {book.genre}</p>
        <p className="card__description">
          Описание: {book.description || "Нет описания"}
        </p>
        {(user?.role === "admin" || user?.role === "librarian") && (
          <div className="card__actions">
            <button className="card__delete" onClick={handleDelete}>
              Удалить
            </button>
          </div>
        )}
      </div>
    </li>
  );
}
