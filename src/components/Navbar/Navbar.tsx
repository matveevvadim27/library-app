import { Link } from "react-router-dom";
import styles from "./navbar.module.scss";

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
          <Link className={styles.nav__link} to="/client">
            Книги
          </Link>
        </li>
        <li className={styles.nav__item}>
          <Link className={styles.nav__link} to="/edit">
            Редактировать
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
