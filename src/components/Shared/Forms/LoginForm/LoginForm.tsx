import { useState } from "react";
import { TToggle } from "../../../../types/toggleFormType";
import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, loginFormData } from "../../../../schemas/loginSchema";
import { set, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../../store/useAuthStore";
import styles from "./LoginForm.module.scss";
import { useAuth } from "hooks/useAuth";
import { ILoginType } from "constants/authRoutes";

const LoginForm: React.FC<TToggle> = ({ toggle }) => {
  const [show, setShow] = useState<string>("password");
  const { setUser } = useAuthStore();
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormData>({ resolver: zodResolver(loginSchema) });

  const handleLogin = async (data: loginFormData) => {
    const responce = await login(data);
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
        onSubmit={handleSubmit(handleLogin)}
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
