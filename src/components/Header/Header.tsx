import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Burger from "../Burger/Burger";
import logo from "../../assets/icons/logo.png";
import { useAuthStore } from "store/authStore";

export default function Header() {
  const { user, logout } = useAuthStore();
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const closeOverlay = () => {
    setIsActive(false);
  };

  return (
    <header className="header">
      <div className="header__container container">
        <Link to="/" className="header__logo" aria-label="На главную">
          <img src={logo} alt="Логотип" loading="lazy" />
          Библиотека
        </Link>
        <div
          className={`header__overlay ${isActive ? "is-active" : ""}`}
          onClick={closeOverlay}
        >
          <Navbar />
          {user ? (
            <button className="header__button" onClick={handleLogout}>
              Выйти ({user.name})
            </button>
          ) : (
            <Link className="header__login" to="/login">
              Вход
            </Link>
          )}
        </div>
        <Burger isActive={isActive} onClick={() => setIsActive(!isActive)} />
      </div>
    </header>
  );
}
