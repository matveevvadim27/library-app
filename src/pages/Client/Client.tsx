import { useBookStore } from "store/bookStore";
import { useState } from "react";
import { filterBooks } from "../../utils/filterBooks";
import BooksList from "../../components/Bookslist/Bookslist";
import BookCard from "../../components/BookCard/BookCard";

export default function ClientPage() {
  const { books } = useBookStore();
  const [searchQuery, setSearchQuery] = useState("");
  const filteredBooks = filterBooks(books, searchQuery);

  return (
    <main className="client">
      <section className="client__section container">
        <h1 className="client__title">Библиотека</h1>
        <label className="client__label">
          Поиск:
          <input
            type="text"
            placeholder="Поиск по автору, жанру или издательству"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="client__input"
          />
        </label>
        {searchQuery.trim() !== "" && filteredBooks.length > 0 && (
          <h2>Найденные книги</h2>
        )}
        <ul className="books__list">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => <BookCard key={book.id} book={book} />)
          ) : searchQuery.trim() !== "" ? (
            <p>Ничего не найдено</p>
          ) : null}
        </ul>
        <BooksList />
      </section>
    </main>
  );
}
