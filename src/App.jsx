import "./styles/main.css";
import { AuthProvider } from "./context/AuthContext";
import { BooksProvider } from "./context/BooksContext";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AppRoutes from "routes/routes";

export default function App() {
  return (
    <AuthProvider>
      <BooksProvider>
        <Header />
        <AppRoutes />
        <Footer />
      </BooksProvider>
    </AuthProvider>
  );
}
