import { useAuth } from "../../context/AuthContext";

export default function AddUsers() {
  const { newUser, setNewUser, handleAddUser } = useAuth();

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
          maxLength={12}
          pattern="[A-Za-zА-Яа-яЁё0-9]+"
          title="Имя может содержать только буквы и числа!"
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
          minLength={3}
          maxLength={12}
          pattern="[A-Za-z0-9]+"
          title="Пароль может содержать только латинские буквы и цифры!"
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
