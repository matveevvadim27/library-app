import { useState, useEffect } from "react";
import { IUser } from "../../store/authStore";
import { setAuthToken } from "../../api/api";
import { useAuthStore } from "../../store/authStore";
import { token } from "../../constants/constants";
import { toast } from "react-toastify";
import api from "../../api/api";
import styles from "./UsersList.module.scss";
import EditUsers from "components/EditUsers/EditUsers";

export default function UsersList() {
  const [editingUser, setEditingUser] = useState<IUser | null>(null);
  const { users, setUsers } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError("");
      setAuthToken(token);
      try {
        const response = await api.get<any>("/users");
        setUsers(response.data.data);
      } catch (err) {
        setError("Не удалось загрузить пользователей");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [setUsers]);

  if (loading) return <p className="loading">Загрузка пользователей...</p>;
  if (error) return <p className="loading">{error}</p>;

  const handleDeleteUser = async (user: number) => {
    try {
      await api.delete(`/users/${user}`);
      toast.success("Пользователь успешно удален!");
      setUsers((prev) => prev.filter((u) => u.id !== user));
    } catch (err) {
      toast.error("Ошибка удаления пользователя!");
    }
  };

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
