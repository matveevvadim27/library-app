import styles from "./BookSearcher.module.scss";
import { useBooks } from "hooks/useBooks";
import BookCard from "../BookCard/BookCard";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { searchFormData, bookSearchSchema } from "schemas/bookSearchSchema";
import { useBookStore } from "store/useBooksStore";

export default function BookSearcher() {
  const { searchBook } = useBooks();
  const { searchedBooks, setSearchedBooks } = useBookStore();

  const { register, handleSubmit } = useForm<searchFormData>({
    resolver: zodResolver(bookSearchSchema),
  });

  const handleSearchBook = async (data: searchFormData) => {
    await searchBook(data);
  };

  return (
    <div>
      <form
        action="submit"
        className={styles.search}
        onSubmit={handleSubmit(handleSearchBook)}
      >
        <label htmlFor="search_author" className={styles.search__label}>
          Автор:
          <input
            id="search_author"
            type="text"
            placeholder="Автор"
            className={styles.search__input}
            {...register("author")}
          />
        </label>
        <label htmlFor="search_publisher" className={styles.search__label}>
          Издательство:
          <input
            id="search_author"
            type="text"
            placeholder="Издательство"
            className={styles.search__input}
            {...register("publisher")}
          />
        </label>
        <label htmlFor="search_genre" className={styles.search__label}>
          Жанр:
          <input
            id="search_author"
            type="text"
            placeholder="Жанр"
            className={styles.search__input}
            {...register("genre")}
          />
        </label>
        <button className={styles.search__btn}>Поиск</button>
      </form>
      {searchedBooks.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}
