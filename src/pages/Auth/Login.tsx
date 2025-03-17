import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "store/authStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import styles from "./login.module.scss";

const loginSchema = z.object({
  name: z.string().min(3, "Имя должно быть не менее 3 символов!"),
  password: z.string().min(3, "Пароль должен быть не менее 3 символов!"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const { login } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = (data: LoginFormData) => {
    const success = login(data.name, data.password);
    if (success) {
      navigate("/");
    }
  };

  return (
    <main className={styles.login}>
      <section className={`${styles.login__section} container`}>
        <h2 className={styles.login__title}>Вход</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.login__form}>
          <label className={styles.login__label}>
            Имя:
            <input
              className={styles.login__input}
              type="text"
              {...register("name")}
            />
          </label>
          <label className={styles.login__label}>
            Пароль:
            <input
              className={styles.login__input}
              type="password"
              {...register("password")}
            />
          </label>
          <button className={styles.login__button} type="submit">
            Войти
          </button>
        </form>
        <p>
          Нет аккаунта?
          <Link className={styles.login__link} to="/register">
            Зарегистрируйтесь
          </Link>
        </p>
      </section>
    </main>
  );
}
