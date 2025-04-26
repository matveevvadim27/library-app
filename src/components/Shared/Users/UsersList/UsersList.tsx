import { useState, useEffect } from "react";
import { IUser, useAuthStore } from "../../../../store/useAuthStore";

import styles from "./UsersList.module.scss";
import EditUsers from "components/Shared/Forms/EditUsersForm/EditUsersForm";

export default function UsersList() {
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const { users, setUsers } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");
    };

    fetchUsers();
  }, [setUsers]);

  if (loading) return <p className="loading">Загрузка пользователей...</p>;
  if (error) return <p className="loading">{error}</p>;

  const handleDeleteUser = async (user: number) => {};

  return (
    <div className={styles.users}>
      <h2 className={styles.users__title}>Список пользователей:</h2>
      {editingUser && (
        <EditUsers user={editingUser} onClose={() => setEditingUser(null)} />
      )}
      <ul className={styles.users__list}>
        {users.map((user) => (
          <li key={user.name} className={styles.users__item}>
            <span className={styles.users__data}>
              {user.name} ({user.role})
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
