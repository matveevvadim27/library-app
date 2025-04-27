import { useState, useEffect } from "react";
import { IUser, useAuthStore } from "../../../../store/useAuthStore";
import styles from "./UsersList.module.scss";
import EditUsers from "components/Shared/Forms/EditUsersForm/EditUsersForm";
import { useUsers } from "hooks/useUsers";

export default function UsersList() {
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const { users, setUsers } = useAuthStore();
  const { getUsers, deleteUser } = useUsers();

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  const getRoleName = (role?: number) => {
    const roleNames: Record<number, string> = {
      1: "Админ",
      2: "Библиотекарь",
      3: "Клиент",
    };
    return role ? roleNames[role] || "Неизвестная роль" : "Неизвестная роль";
  };

  const handleDeleteUser = async (user: number) => {
    await deleteUser(user);
  };

  return (
    <div className={styles.users}>
      {editingUser && (
        <EditUsers user={editingUser} onClose={() => setEditingUser(null)} />
      )}
      <h2 className={styles.users__title}>Список пользователей:</h2>
      <ul className={styles.users__list}>
        {users.map((user) => (
          <li key={user.id} className={styles.users__item}>
            <span className={styles.users__data}>
              {user.name} ({getRoleName(user.role)})
            </span>
            <button
              className={styles.users__edit}
              onClick={() => setEditingUser(user)}
            >
              Редактировать
            </button>
            <button
              className={styles.users__delete}
              onClick={() => handleDeleteUser(user.id)}
            >
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
