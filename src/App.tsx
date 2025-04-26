import "./styles/main.scss";
import Header from "./components/Layout/Header/Header";
import Footer from "./components/Layout/Footer/Footer";
import RoutesApp from "./routes/routes";
import { useEffect } from "react";
import { initializeUser } from "utils/initializeUser";
import { useAuthStore } from "store/useAuthStore";
import Spinner from "components/UI/Spinner/Spinner";

export default function App() {
  const { isLoading } = useAuthStore();

  useEffect(() => {
    initializeUser();
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

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
