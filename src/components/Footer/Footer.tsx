import styles from "./footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <p>© 2025 Библиотека. Все права защищены.</p>
      </div>
    </footer>
  );
}
