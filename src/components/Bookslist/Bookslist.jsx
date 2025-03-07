import { useBooks } from "../../context/BooksContext";
import BookCard from "../BookCard/BookCard";
import { useAuth } from "../../context/AuthContext";

export default function BookList() {
  const { books, removeBook } = useBooks();
  const { user } = useAuth();

  return !books || books.length === 0 ? (
    <h2 className="booklist__empty">Список книг пуст</h2>
  ) : (
    <div className="books__body">
      <h2 className="books__title">Список книг</h2>
      <ul className="books__list">
        {books.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            user={user}
            onDelete={removeBook}
          />
        ))}
      </ul>
    </div>
  );
}
