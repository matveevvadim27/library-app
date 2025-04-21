import { useState } from "react";
import { TToggle } from "../../types/toggleFormType";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, loginFormData } from "../../schemas/loginSchema";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { setAuthToken } from "../../api/api";
import api from "../../api/api";
import styles from "./LoginForm.module.scss";

const LoginForm: React.FC<TToggle> = ({ toggle }) => {
  const [show, setShow] = useState<string>("password");
  const { setUser } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: loginFormData) => {
    try {
      const loginResponse = await api.post<any>("/login", data);
      const token = loginResponse.data.token;
      localStorage.setItem("token", token);
      setAuthToken(token);
      const userResponse = await api.get<any>("/me");
      setUser(userResponse.data.data);
      navigate("/");
    } catch (error) {
      console.error("Ошибка авторизации:", error);
    }
  };

  return (
    <motion.div
      key="login"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
      className="form"
    >
      <form
        action="submit"
        className={styles.login}
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className={styles.login__greeting}>С возвращением!</h1>
        <label
          htmlFor="email"
          className={`${styles.login__label} visually-hidden`}
        >
          Email:
        </label>
        <input
          id="email"
          type="text"
          placeholder="Email"
          className={styles.login__input}
          {...register("email")}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}
        <label
          htmlFor="password"
          className={`${styles.login__label} visually-hidden`}
        >
          Пароль:
        </label>
        <input
          id="password"
          type={show}
          placeholder="Пароль"
          className={styles.login__input}
          {...register("password")}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}
        <div className={styles.login__show}>
          <label htmlFor="show" className={`${styles.register__label}`}>
            Показать пароль:
          </label>
          <input
            id="show"
            type="checkbox"
            name="show"
            onChange={() =>
              setShow((prev) => (prev === "password" ? "text" : "password"))
            }
          />
        </div>
        <button className={styles.login__btn} type="submit">
          Войти
        </button>
        <p className={styles.login__toregister} onClick={toggle}>
          Нет аккаунта? Зарегистрироваться
        </p>
      </form>
    </motion.div>
  );
};
export default LoginForm;
