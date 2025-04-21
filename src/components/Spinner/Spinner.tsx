import styles from "./Spinner.module.scss";

const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <div className={styles.spinner__it}></div>
    </div>
  );
};

export default Spinner;
