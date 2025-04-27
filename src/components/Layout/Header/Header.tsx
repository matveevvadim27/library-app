import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "../../Shared/Bars/Navbar/Navbar";
import Burger from "../../UI/Buttons/BurgerButton/Burger";
import logo from "../../../assets/icons/logo.png";
import styles from "./Header.module.scss";
import LoginButton from "../../UI/Buttons/LoginButton/LoginButton";

export default function Header() {
  const [isActive, setIsActive] = useState<boolean>(false);

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
          <LoginButton />
        </div>
        <Burger isActive={isActive} onClick={() => setIsActive(!isActive)} />
      </div>
    </header>
  );
}
