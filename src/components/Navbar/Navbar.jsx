import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className={"header__nav nav"}>
      <ul className="nav__list">
        <li className="nav__item">
          <Link className="nav__link" to="/">
            Главная
          </Link>
        </li>
        <li className="nav__item">
          <Link className="nav__link" to="/client">
            Книги
          </Link>
        </li>
        <li className="nav__item">
          <Link className="nav__link" to="/edit">
            Редактировать
          </Link>
        </li>
        <li className="nav__item">
          <Link className="nav__link" to="/admin">
            Админ
          </Link>
        </li>
      </ul>
    </nav>
  );
}
