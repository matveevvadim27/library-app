import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";
import { useAuthStore } from "store/useAuthStore";

export default function Navbar() {
  const { user } = useAuthStore();

  return (
    <nav className={styles.nav}>
      <ul className={styles.nav__list}>
        <li className={styles.nav__item}>
          <Link className={styles.nav__link} to="/">
            Главная
          </Link>
        </li>
        <li className={styles.nav__item}>
          <Link className={styles.nav__link} to="/library">
            Книги
          </Link>
        </li>
        {user && user.role! <= 2 && (
          <li className={styles.nav__item}>
            <Link className={styles.nav__link} to="/librarian">
              Библиотекарь
            </Link>
          </li>
        )}
        {user && user.role! === 1 && (
          <li className={styles.nav__item}>
            <Link className={styles.nav__link} to="/admin">
              Админ
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
