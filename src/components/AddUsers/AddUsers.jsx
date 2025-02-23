import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddUsers({ addUser, users }) {
  const [newUser, setNewUser] = useState({
    name: "",
    password: "",
    role: "client",
  });

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.name || !newUser.password) {
      toast.error("Укажите имя и пароль!");
      return;
    }

    const userExists = users.some((user) => user.name === newUser.name);
    if (userExists) {
      toast.error("Пользователь с таким именем уже существует!");
      return;
    }

    addUser(newUser.name, newUser.password, newUser.role);
    setNewUser({
      name: "",
      password: "",
      role: "client",
    });
    toast.success("Пользователь успешно добавлен!");
  };

  return (
    <form onSubmit={handleAddUser} className="add">
      <h3 className="change__title">Добавить пользователя:</h3>
      <label className="add__label">
        Имя:
        <input
          className="add__input"
          type="text"
          placeholder="Имя"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
        />
      </label>
      <label className="add__label">
        Пароль:
        <input
          className="add__input"
          type="password"
          placeholder="Пароль"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        />
      </label>
      <label className="add__label">
        Роль:
        <select
          className="add__input"
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="client">Клиент</option>
          <option value="librarian">Библиотекарь</option>
          <option value="admin">Администратор</option>
        </select>
      </label>
      <button className="add__button" type="submit">
        Добавить
      </button>
    </form>
  );
}
