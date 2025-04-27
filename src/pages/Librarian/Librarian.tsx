import AddBookForm from "../../components/Shared/Forms/AddBookForm/AddBookForm";
import styles from "./Librarian.module.scss";
import BooksRequestedList from "components/Shared/Books/BooksRequestedList/BooksRequestedList";
import Modal from "components/UI/Modals/Modal";
import { useState } from "react";

export default function Librarian() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <section className={`${styles.librarian} container`}>
      <h1 className={styles.librarian__title}>
        Добро пожаловать в панель библиотекаря!
      </h1>
      <button
        className={styles.librarian__btn}
        onClick={() => setIsModalOpen(true)}
      >
        Добавить книгу
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddBookForm />
      </Modal>
      <BooksRequestedList />
    </section>
  );
}
