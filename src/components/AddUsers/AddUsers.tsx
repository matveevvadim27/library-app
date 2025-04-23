import { AddFormData, addSchema } from "../../schemas/addSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../../store/authStore";
import { toast } from "react-toastify";
import api from "../../api/axios";
import styles from "./AddUsers.module.scss";

export default function AddUsers() {
  const { setUsers } = useAuthStore();

  const {
    register: registerUser,
    handleSubmit,
    formState: { errors },
  } = useForm<AddFormData>({
    resolver: zodResolver(addSchema),
  });

  const onSubmit = async (data: AddFormData) => {
    try {
      await api.post("/register", data);
      const response = await api.get<any>("/users");
      setUsers(response.data.data);
      toast.success("Пользователь успешно добавлен!");
    } catch (error) {
      toast.error("Ошибка регистрации!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.add}>
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

      <button className={styles.add__button} type="submit">
        Добавить
      </button>
    </form>
  );
}
