import { Dispatch, SetStateAction } from "react";
import { useAuthStore } from "store/authStore";
import { User } from "../../schemas/AuthSchema";
import styles from "./usersList.module.scss";

interface AdminProps {
  setEditUser: Dispatch<SetStateAction<User | null>>;
}

export default function UsersList({ setEditUser }: AdminProps) {
  const { users, deleteUser } = useAuthStore();

  return (
    <div className={styles.users}>
      <h2 className={styles.users__title}>Список пользователей:</h2>
      <ul className={styles.users__list}>
        {users.map((user) => (
          <li key={user.name} className={styles.users__item}>
            <span className={styles.users__data}>
              {user.name} ({user.role})
            </span>
            <button
              className={styles.users__edit}
              onClick={() => setEditUser(user)}
            >
              Редактировать
            </button>
            <button
              className={styles.users__delete}
              onClick={() => deleteUser(user.name)}
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
