import { useForm } from "react-hook-form";
import { useBookStore } from "../../store/booksStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookFormData, bookSchema } from "../../schemas/bookSchema";
import { toast } from "react-toastify";
import api from "../../api/axios";
import styles from "./AddBook.module.scss";

const AddBookForm: React.FC = () => {
  const { setBooks } = useBookStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookFormData>({ resolver: zodResolver(bookSchema) });

  const onSubmit = async (data: BookFormData) => {
    try {
      await api.post("/books", data);
      const response = await api.get<any>("/books");
      setBooks(response.data.data);
      toast.success("Книга успешно добавлена!");
    } catch (error) {
      toast.error("Ошибка добавления книги!");
    }
  };
  return (
    <form className={styles.edit__form} onSubmit={handleSubmit(onSubmit)}>
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
