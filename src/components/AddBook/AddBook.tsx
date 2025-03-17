import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useBookStore } from "store/bookStore";
import { bookSchema } from "../../schemas/BookSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import styles from "./addBook.module.scss";

type TBookFormData = z.infer<typeof bookSchema>;

export default function AddBook() {
  const { addBook } = useBookStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TBookFormData>({ resolver: zodResolver(bookSchema) });

  const onSubmit = (data: TBookFormData) => {
    addBook(data);
    toast.success("Книга успешно добавлена!");
  };
  return (
    <form className={styles.edit__form} onSubmit={handleSubmit(onSubmit)}>
      <label className={styles.edit__label}>
        Название:
        <input {...register("title")} className={styles.edit__input} />
        {errors.title && <p className="error">{errors.title.message}</p>}
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
        Картинка (URL):
        <input {...register("image")} className={styles.edit__input} />
        {errors.image && <p className="error">{errors.image.message}</p>}
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
}
