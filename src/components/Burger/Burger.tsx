import { useEffect } from "react";
import styles from "./burger.module.scss";

interface BurgerProps {
  isActive: boolean;
  onClick: () => void;
}

export default function Burger({ isActive, onClick }: BurgerProps) {
  useEffect(() => {
    if (isActive) {
      document.documentElement.classList.add("is-lock");
    } else {
      document.documentElement.classList.remove("is-lock");
    }
  }, [isActive]);

  return (
    <button
      className={`${styles.burger} visible-tablet-s ${
        isActive ? "is-active" : ""
      }`}
      onClick={onClick}
    >
      <span className={styles.burger__line}></span>
      <span className={styles.burger__line}></span>
      <span className={styles.burger__line}></span>
    </button>
  );
}
