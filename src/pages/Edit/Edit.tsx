import AddBook from "../../components/AddBook/AddBook";

export default function Edit() {
  return (
    <main className="edit">
      <section className="edit__section container">
        <h1 className="edit__title">Редактор книг</h1>
        <AddBook />
      </section>
    </main>
  );
}
