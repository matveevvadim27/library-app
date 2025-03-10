import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditUsers({ editUser, setEditUser, updateUser }) {
  const [editedUser, setEditedUser] = useState(editUser);

  const handleEditUser = (e) => {
    e.preventDefault();
    if (!editedUser.name || !editedUser.password) return;
    updateUser({ ...editedUser, oldName: editUser.name });
    setEditUser(null);
    toast.success("Пользователь успешно изменен!");
  };

  return (
    <form onSubmit={handleEditUser} className="change">
      <h3 className="change__title">Редактировать: {editUser.name}</h3>
      <label className="change__label">
        Имя:
        <input
          className="change__input"
          type="text"
          value={editedUser.name}
          onChange={(e) =>
            setEditedUser({ ...editedUser, name: e.target.value })
          }
        />
      </label>
      <label className="change__label">
        Пароль:
        <input
          className="change__input"
          type="password"
          value={editedUser.password}
          onChange={(e) =>
            setEditedUser({ ...editedUser, password: e.target.value })
          }
        />
      </label>
      <label className="change__label">
        Роль:
        <select
          className="change__input"
          value={editedUser.role}
          onChange={(e) =>
            setEditedUser({ ...editedUser, role: e.target.value })
          }
        >
          <option value="client">Клиент</option>
          <option value="librarian">Библиотекарь</option>
          <option value="admin">Администратор</option>
        </select>
      </label>
      <button className="change__save" type="submit">
        Сохранить
      </button>
      <button
        className="change__cancel"
        type="button"
        onClick={() => setEditUser(null)}
      >
        Отмена
      </button>
    </form>
  );
}
