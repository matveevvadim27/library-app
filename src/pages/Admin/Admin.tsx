import styles from "./Admin.module.scss";
import { useState } from "react";
import UsersList from "../../components/Shared/Users/UsersList/UsersList";
import AddUsersForm from "../../components/Shared/Forms/AddUsersForm/AddUsersForm";
import Modal from "components/UI/Modals/Modal";

export default function Admin() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <section className={`${styles.admin} container`}>
      <h1 className={styles.admin__title}>
        Добро пожаловать в панель администратора!
      </h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className={styles.admin__btn}
      >
        Добавить
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddUsersForm />
      </Modal>
      <UsersList />
    </section>
  );
}
