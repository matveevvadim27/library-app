import "./styles/main.scss";
import Header from "./components/Layout/Header/Header";
import Footer from "./components/Layout/Footer/Footer";
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
