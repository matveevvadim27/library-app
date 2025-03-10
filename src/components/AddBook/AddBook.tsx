import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useBookStore } from "store/bookStore";
import { bookSchema } from "../../schemas/BookSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";

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
    <form className="edit__form" onSubmit={handleSubmit(onSubmit)}>
      <label className="edit__label">
        Название:
        <input {...register("title")} className="edit__input" />
        {errors.title && toast.error(errors.title.message)}
      </label>

      <label className="edit__label">
        Автор:
        <input {...register("author")} className="edit__input" />
        {errors.author && toast.error(errors.author.message)}
      </label>

      <label className="edit__label">
        Издательство:
        <input {...register("publisher")} className="edit__input" />
        {errors.publisher && toast.error(errors.publisher.message)}
      </label>
      <label className="edit__label">
        Жанр:
        <input {...register("genre")} className="edit__input" />
        {errors.genre && toast.error(errors.genre.message)}
      </label>
      <label className="edit__label">
        Картинка (URL):
        <input {...register("image")} className="edit__input" />
        {errors.image && toast.error(errors.image.message)}
      </label>

      <label className="edit__label">
        Описание:
        <textarea {...register("description")} className="edit__input" />
        {errors.description && toast.error(errors.description.message)}
      </label>
      <button className="edit__button" type="submit">
        Добавить книгу
      </button>
    </form>
  );
}
