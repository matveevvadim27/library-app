import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Burger from "../Burger/Burger";
import logo from "../../assets/icons/logo.png";
import { useAuthStore } from "store/authStore";
import styles from "./header.module.scss";

export default function Header() {
  const { user, logout } = useAuthStore();
  const [isActive, setIsActive] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const closeOverlay = () => {
    setIsActive(false);
  };

  return (
    <header className={styles.header}>
      <div className={`${styles.header__container} container`}>
        <Link to="/" className={styles.header__logo} aria-label="На главную">
          <img src={logo} alt="Логотип" loading="lazy" />
          Библиотека
        </Link>
        <div
          className={`${styles.header__overlay} ${
            isActive ? styles.isActive : ""
          }`}
          onClick={closeOverlay}
        >
          <Navbar />
          {user ? (
            <button className={styles.header__button} onClick={handleLogout}>
              Выйти ({user.name})
            </button>
          ) : (
            <Link className={styles.header__login} to="/login">
              Вход
            </Link>
          )}
        </div>
        <Burger isActive={isActive} onClick={() => setIsActive(!isActive)} />
      </div>
    </header>
  );
}
