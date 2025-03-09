import { Book, useBookStore } from "store/bookStore";
import BookCard from "../BookCard/BookCard";

interface BookCardProps {
  books: Book[];
}

export default function BookList() {
  const { books } = useBookStore();

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
