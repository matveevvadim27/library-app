export default function Home() {
  return (
    <main className="home">
      <section className="home__section container">
        <h1 className="home__title">Добро пожаловать в библиотеку!</h1>
        <h2 className="home__description">
          Здесь вы можете просматривать книги, добавлять новые издания и
          управлять библиотекой.
        </h2>
        <p className="home__instructions">
          Перед началом, пожалуйста, авторизуйтесь!
        </p>
      </section>
    </main>
  );
}
