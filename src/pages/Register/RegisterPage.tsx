import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("client");
  const [error, setError] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Пароли не совпадают!");
      return;
    }
    const success = register(name, password, role);
    if (success) {
      navigate("/login");
    } else {
      setError("Имя уже занято!");
    }
  };

  return (
    <main className="auth">
      <section className="auth__section container">
        <h2 className="auth__title">Регистрация</h2>
        <form onSubmit={handleSubmit} className="auth__form">
          <label className="auth__label">
            Имя:
            <input
              className="auth__input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={12}
              pattern="[A-Za-zА-Яа-яЁё0-9]+"
              title="Имя может содержать только буквы и числа!"
              required
            />
          </label>
          <label className="auth__label">
            Пароль:
            <input
              className="auth__input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={3}
              maxLength={12}
              pattern="[A-Za-z0-9]+"
              title="Пароль может содержать только латинские буквы и цифры!"
              required
            />
          </label>
          <label className="auth__label">
            Подтвердите пароль:
            <input
              className="auth__input"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <label className="auth__label">
            Выберите роль:
            <select
              className="auth__input"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="client">Клиент</option>
              <option value="librarian">Библиотекарь</option>
              <option value="admin">Администратор</option>
            </select>
          </label>
          {error && <p className="auth__error">{error}</p>}
          <button className="auth__button" type="submit">
            Зарегистрироваться
          </button>
        </form>
        <p>
          Уже есть аккаунт?
          <Link className="auth__link" to="/login">
            Войти
          </Link>
        </p>
      </section>
    </main>
  );
}
