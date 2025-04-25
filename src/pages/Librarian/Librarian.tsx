import AddBook from "../../components/AddBookForm/AddBook";
import styles from "./Librarian.module.scss";

export default function Librarian() {
  return (
    <section className={`${styles.librarian} container`}>
      <h1 className={styles.librarian__title}>
        Добро пожаловать в панель библиотекаря!
      </h1>
      <AddBook />
    </section>
  );
}
