import { useAuthStore } from "../../store/authStore";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./LoginButton.module.scss";

export default function LoginButton() {
  const { currentUser, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return currentUser === null ? (
    <Link to="/auth" className={styles.login}>
      Войти
    </Link>
  ) : (
    <button className={styles.login} onClick={handleLogout}>
      {currentUser ? currentUser.name : "Загрузка..."}
    </button>
  );
}
