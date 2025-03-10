import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
// import { useAuth } from "../../context/AuthContext";
import { useAuthStore } from "store/authStore";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const success = login(name, password);
    if (success) {
      navigate("/");
    } else {
      setError("Неверное имя или пароль!");
    }
  };

  return (
    <main className="login">
      <section className="login__section container">
        <h2 className="login__title">Вход</h2>
        <form onSubmit={handleSubmit} className="login__form">
          <label className="login__label">
            Имя:
            <input
              className="login__input"
              type="text"
              name="login"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label className="login__label">
            Пароль:
            <input
              className="login__input"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {error && <p className="login__error">{error}</p>}
          <button className="login__button" type="submit">
            Войти
          </button>
        </form>
        <p>
          Нет аккаунта?
          <Link className="login__link" to="/register">
            Зарегистрируйтесь
          </Link>
        </p>
      </section>
    </main>
  );
}
