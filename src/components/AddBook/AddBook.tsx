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
        {errors.title && toast.error(errors.title.message)}
      </label>

      <label className={styles.edit__label}>
        Автор:
        <input {...register("author")} className={styles.edit__input} />
        {errors.author && toast.error(errors.author.message)}
      </label>

      <label className={styles.edit__label}>
        Издательство:
        <input {...register("publisher")} className={styles.edit__input} />
        {errors.publisher && toast.error(errors.publisher.message)}
      </label>
      <label className={styles.edit__label}>
        Жанр:
        <input {...register("genre")} className={styles.edit__input} />
        {errors.genre && toast.error(errors.genre.message)}
      </label>
      <label className={styles.edit__label}>
        Картинка (URL):
        <input {...register("image")} className={styles.edit__input} />
        {errors.image && toast.error(errors.image.message)}
      </label>

      <label className={styles.edit__label}>
        Описание:
        <textarea {...register("description")} className={styles.edit__input} />
        {errors.description && toast.error(errors.description.message)}
      </label>
      <button className={styles.edit__button} type="submit">
        Добавить книгу
      </button>
    </form>
  );
}
