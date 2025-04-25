import styles from "./Admin.module.scss";
import { useState } from "react";
import UsersList from "../../components/Shared/Users/UsersList/UsersList";
import AddUsersForm from "../../components/Shared/Forms/AddUsersForm/AddUsersForm";

export default function Admin() {
  const [add, setAdd] = useState<boolean>(false);

  const onClick = () => {
    setAdd((prev) => (prev == false ? true : false));
  };
  return (
    <section className={`${styles.admin} container`}>
      <h1 className={styles.admin__title}>
        Добро пожаловать в панель администратора!
      </h1>
      <button onClick={onClick} className={styles.admin__btn}>
        Добавить
      </button>
      {add && <AddUsersForm />}
      <UsersList />
    </section>
  );
}
