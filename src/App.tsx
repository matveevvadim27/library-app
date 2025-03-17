import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AppRoutes from "routes/routes";

export default function App() {
  return (
    <>
      <Header />
      <AppRoutes />
      <Footer />
    </>
  );
}
