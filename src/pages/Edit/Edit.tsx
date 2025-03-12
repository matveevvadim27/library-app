import AddBook from "../../components/AddBook/AddBook";
import styles from "./edit.module.scss";

export default function Edit() {
  return (
    <main className={styles.edit}>
      <section className={`${styles.edit__section} container`}>
        <h1 className={styles.edit__title}>Редактор книг</h1>
        <AddBook />
      </section>
    </main>
  );
}
