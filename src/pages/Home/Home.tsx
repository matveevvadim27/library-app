import styles from "./home.module.scss";

export default function Home() {
  return (
    <main className={styles.home}>
      <section className={`${styles.home__section} container`}>
        <h1>Добро пожаловать в библиотеку!</h1>
        <h2>
          Здесь вы можете просматривать книги, добавлять новые издания и
          управлять библиотекой.
        </h2>
        <p>Перед началом, пожалуйста, авторизуйтесь!</p>
      </section>
    </main>
  );
}
