import { useForm } from "react-hook-form";
import { useBookStore } from "../../../../store/useBooksStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { bookFormData, bookSchema } from "../../../../schemas/bookSchema";
import styles from "./AddBook.module.scss";
import { useBooks } from "hooks/useBooks";

const AddBookForm: React.FC = () => {
  const { setBooks } = useBookStore();
  const { postBook } = useBooks();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<bookFormData>({ resolver: zodResolver(bookSchema) });

  const handleAddBook = async (data: bookFormData) => {
    await postBook(data);
  };
  return (
    <form className={styles.edit__form} onSubmit={handleSubmit(handleAddBook)}>
      <h2 className={styles.edit__title}>Добавить книгу</h2>
      <label className={styles.edit__label}>
        Название:
        <input {...register("name")} className={styles.edit__input} />
        {errors.name && <p className="error">{errors.name.message}</p>}
      </label>

      <label className={styles.edit__label}>
        Автор:
        <input {...register("author")} className={styles.edit__input} />
        {errors.author && <p className="error">{errors.author.message}</p>}
      </label>

      <label className={styles.edit__label}>
        Издательство:
        <input {...register("publisher")} className={styles.edit__input} />
        {errors.publisher && (
          <p className="error">{errors.publisher.message}</p>
        )}
      </label>

      <label className={styles.edit__label}>
        Жанр:
        <input {...register("genre")} className={styles.edit__input} />
        {errors.genre && <p className="error">{errors.genre.message}</p>}
      </label>

      <label className={styles.edit__label}>
        Описание:
        <textarea {...register("description")} className={styles.edit__input} />
        {errors.description && (
          <p className="error">{errors.description.message}</p>
        )}
      </label>
      <button className={styles.edit__button} type="submit">
        Добавить книгу
      </button>
    </form>
  );
};

export default AddBookForm;
