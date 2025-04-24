import "./styles/main.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import RoutesApp from "./routes/routes";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <RoutesApp />
      </main>
      <Footer />
    </>
  );
}
