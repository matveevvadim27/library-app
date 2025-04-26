import { useAuthStore } from "../../../../store/useAuthStore";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styles from "./LoginButton.module.scss";

export default function LoginButton() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  return user === null ? (
    <Link to="/auth" className={styles.login}>
      Войти
    </Link>
  ) : (
    <button className={styles.login} onClick={handleLogout}>
      {user ? user.name : "Загрузка..."}
    </button>
  );
}
