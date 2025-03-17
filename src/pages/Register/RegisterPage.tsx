import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "store/authStore";
import { z } from "zod";
import { toast } from "react-toastify";
import styles from "./registerpage.module.scss";
import { registerSchema } from "../../schemas/registerSchema";

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const { register: registerUser } = useAuthStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const onSubmit = (user: RegisterFormData) => {
    if (password !== confirmPassword) {
      toast.error("Пароли не совпадают");
      return;
    }
    if (registerUser(user.name, user.password, user.role)) {
      navigate("/login");
      toast.success("Успешная регистрация!");
    }
  };

  return (
    <main className={styles.auth}>
      <section className={`${styles.auth__section} container`}>
        <h2 className={styles.auth__title}>Регистрация</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.auth__form}>
          <label className={styles.auth__label}>
            Имя:
            <input
              className={styles.auth__input}
              type="text"
              {...register("name")}
            />
            {errors.name && <p className="error">{errors.name.message}</p>}
          </label>
          <label className={styles.auth__label}>
            Пароль:
            <input
              className={styles.auth__input}
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}
          </label>
          <label className={styles.auth__label}>
            Подтвердите пароль:
            <input
              className={styles.auth__input}
              type="password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="error">{errors.confirmPassword.message}</p>
            )}
          </label>
          <label className={styles.auth__label}>
            Выберите роль:
            <select className={styles.auth__input} {...register("role")}>
              <option value="client">Клиент</option>
              <option value="librarian">Библиотекарь</option>
              <option value="admin">Администратор</option>
            </select>
          </label>
          <button className={styles.auth__button} type="submit">
            Зарегистрироваться
          </button>
        </form>
        <p>
          Уже есть аккаунт?{" "}
          <Link className={styles.auth__link} to="/login">
            Войти
          </Link>
        </p>
      </section>
    </main>
  );
}
