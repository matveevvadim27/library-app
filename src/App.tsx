import "./styles/main.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import RoutesApp from "./routes/routes";
import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import { fetchCurrentUser } from "./api/axios";
import Spinner from "./components/Spinner/Spinner";
import { setAuthToken } from "./api/axios";
import { token } from "./constants/role";

export default function App() {
  const { setUser, setLoading, isLoading } = useAuthStore();

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      try {
        setAuthToken(token);
        const user = await fetchCurrentUser();
        if (user) {
          setUser(user);
        }
      } catch (error) {
        console.error("Ошибка при загрузке пользователя", error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, [setUser, setLoading]);

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
