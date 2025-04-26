import { AddFormData, addSchema } from "../../../../schemas/addSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./AddUsers.module.scss";
import { useUsers } from "../../../../hooks/useUsers";

export default function AddUsers() {
  const { postUser } = useUsers();

  const {
    register: registerUser,
    handleSubmit,
    formState: { errors },
  } = useForm<AddFormData>({
    resolver: zodResolver(addSchema),
  });

  const handleAddUser = async (data: AddFormData) => {
    await postUser(data);
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
        Email:
        <input
          className={styles.add__input}
          type="text"
          placeholder="Email"
          {...registerUser("email")}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}
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
        <select
          className={styles.add__input}
          {...registerUser("role", { valueAsNumber: true })}
        >
          <option value={1}>Администратор</option>
          <option value={2}>Библиотекарь</option>
          <option value={3}>Пользователь</option>
        </select>
        {errors.password && <p className="error">{errors.password.message}</p>}
      </label>

      <button className={styles.add__button} type="submit">
        Добавить
      </button>
    </form>
  );
}
