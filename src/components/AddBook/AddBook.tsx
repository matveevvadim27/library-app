import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useBookStore } from "store/bookStore";

export default function AddBook() {
  const { addBook } = useBookStore();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || !author || !publisher || !genre) {
      toast.error("Название, автор, жанр и издательство обязательны!");
      return;
    }

    addBook({ title, author, publisher, genre, image, description });
    setTitle("");
    setAuthor("");
    setPublisher("");
    setImage("");
    setDescription("");
    setGenre("");

    toast.success("Книга успешно добавлена!");
    console.log(addBook);
  };

  return (
    <form className="edit__form" onSubmit={handleSubmit}>
      <label className="edit__label">
        Название:
        <input
          className="edit__input"
          type="text"
          value={title}
          title="Разрешены только буквы и числа!"
          pattern="[A-Za-zА-Яа-яЁё0-9\s]+"
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <label className="edit__label">
        Автор:
        <input
          className="edit__input"
          type="text"
          value={author}
          title="Разрешены только буквы и числа!"
          pattern="[A-Za-zА-Яа-яЁё0-9\s]+"
          onChange={(e) => setAuthor(e.target.value)}
        />
      </label>

      <label className="edit__label">
        Издательство:
        <input
          className="edit__input"
          type="text"
          value={publisher}
          pattern="[A-Za-zА-Яа-яЁё0-9\s]+"
          title="Разрешены только буквы и числа!"
          onChange={(e) => setPublisher(e.target.value)}
        />
      </label>
      <label className="edit__label">
        Жанр:
        <input
          className="edit__input"
          type="text"
          value={genre}
          title="Разрешены только буквы и числа!"
          pattern="[A-Za-zА-Яа-яЁё0-9\s]+"
          onChange={(e) => setGenre(e.target.value)}
        />
      </label>
      <label className="edit__label">
        Картинка (URL):
        <input
          className="edit__input"
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </label>

      <label className="edit__label">
        Описание:
        <textarea
          className="edit__input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>
      <button className="edit__button" type="submit">
        Добавить книгу
      </button>
    </form>
  );
}
