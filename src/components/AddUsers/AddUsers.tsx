import { UserRole } from "../../constants/UserRoles";
import { useAuthStore } from "store/authStore";
import { userSchema, User } from "../../schemas/AuthSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import styles from "./addUsers.module.scss";

export default function AddUsers() {
  const {
    register: registerUser,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(userSchema),
  });
  const { register } = useAuthStore();

  const handleAddUser = (user: User) => {
    if (register(user.name, user.password, user.role)) {
      toast.success("Пользователь успешно добавлен!");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleAddUser)} className={styles.add}>
      <h3>Добавить пользователя:</h3>
      <label className={styles.add__label}>
        Имя:
        <input
          className={styles.add__input}
          type="text"
          placeholder="Имя"
          {...registerUser("name")}
        />
        {errors.name && <p className="error">{errors.name.message}</p>}
      </label>
      <label className={styles.add__label}>
        Пароль:
        <input
          className={styles.add__input}
          type="password"
          placeholder="Пароль"
          {...registerUser("password")}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}
      </label>
      <label className={styles.add__label}>
        Роль:
        <select className={styles.add__input} {...registerUser("role")}>
          <option value={UserRole.Client}>Клиент</option>
          <option value={UserRole.Librarian}>Библиотекарь</option>
          <option value={UserRole.Admin}>Администратор</option>
        </select>
      </label>
      <button className={styles.add__button} type="submit">
        Добавить
      </button>
    </form>
  );
}
