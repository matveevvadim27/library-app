import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";

export default function Navbar() {
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
        <li className={styles.nav__item}>
          <Link className={styles.nav__link} to="/librarian">
            Библиотекарь
          </Link>
        </li>
        <li className={styles.nav__item}>
          <Link className={styles.nav__link} to="/admin">
            Админ
          </Link>
        </li>
      </ul>
    </nav>
  );
}
