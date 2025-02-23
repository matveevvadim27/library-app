import { useEffect } from "react";

export default function Burger({ isActive, onClick }) {
  useEffect(() => {
    if (isActive) {
      document.documentElement.classList.add("is-lock");
    } else {
      document.documentElement.classList.remove("is-lock");
    }
  }, [isActive]);

  return (
    <button
      className={`burger visible-tablet-s ${isActive ? "is-active" : ""}`}
      onClick={onClick}
    >
      <span className="burger__line"></span>
      <span className="burger__line"></span>
      <span className="burger__line"></span>
    </button>
  );
}
