import { useBooks, Book } from "../../context/BooksContext";
import BookCard from "../BookCard/BookCard";
import { useAuth, User } from "../../context/AuthContext";

interface BookCardProps {
  books: Book[];
}

export default function BookList({ books }: BookCardProps) {
  const { removeBook } = useBooks();
  const { user } = useAuth();

  return !books || books.length === 0 ? (
    <h2 className="booklist__empty">Список книг пуст</h2>
  ) : (
    <div className="books__body">
      <h2 className="books__title">Список книг</h2>
      <ul className="books__list">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </ul>
    </div>
  );
}
