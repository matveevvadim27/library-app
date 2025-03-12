import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserRole } from "../../constants/UserRoles";
import { useAuthStore } from "store/authStore";
import { z } from "zod";
import { toast } from "react-toastify";
import styles from "./registerpage.module.scss";

const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Имя должно быть не менее 3 символов!")
    .regex(
      /^[A-Za-zА-Яа-яЁё0-9]+$/,
      "Имя может содержать только буквы и числа!"
    ),
  password: z
    .string()
    .min(3, "Пароль должен быть не менее 3 символов!")
    .max(12, "Пароль не должен превышать 12 символов!")
    .regex(
      /^[A-Za-z0-9]+$/,
      "Пароль может содержать только латинские буквы и цифры!"
    ),
  confirmPassword: z
    .string()
    .min(3, "Подтверждение пароля должно быть не менее 3 символов!")
    .max(12, "Подтверждение пароля не должно превышать 12 символов!"),
  role: z.enum([UserRole.Admin, UserRole.Librarian, UserRole.Client]),
});

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

  const onSubmit = (data: RegisterFormData) => {
    if (password !== confirmPassword) {
      return;
    }
    const success = registerUser(data.name, data.password, data.role);
    if (success) {
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
            {errors.name && toast.error(errors.name.message)}
          </label>
          <label className={styles.auth__label}>
            Пароль:
            <input
              className={styles.auth__input}
              type="password"
              {...register("password")}
            />
            {errors.password && toast.error(errors.password.message)}
          </label>
          <label className={styles.auth__label}>
            Подтвердите пароль:
            <input
              className={styles.auth__input}
              type="password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword &&
              toast.error(errors.confirmPassword.message)}
          </label>
          <label className={styles.auth__label}>
            Выберите роль:
            <select className={styles.auth__input} {...register("role")}>
              <option value="client">Клиент</option>
              <option value="librarian">Библиотекарь</option>
              <option value="admin">Администратор</option>
            </select>
            {errors.role && toast.error(errors.role.message)}
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
