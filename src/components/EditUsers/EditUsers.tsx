import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import { UserRole } from "../../constants/UserRoles";
import { useAuthStore } from "store/authStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, User } from "../../schemas/authSchema";
import styles from "./editUsers.module.scss";

interface IAdminProps {
  editUser: User;
  setEditUser: Dispatch<SetStateAction<User | null>>;
}

export default function EditUsers({ editUser, setEditUser }: IAdminProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(userSchema),
    defaultValues: editUser,
  });
  const { updateUser } = useAuthStore();

  const onSubmit = (data: User) => {
    updateUser({ ...data, oldName: editUser.name });
    setEditUser(null);
    toast.success("Пользователь успешно изменен!");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.change}>
      <h3 className={styles.change__title}>Редактировать: {editUser.name}</h3>
      <label className={styles.change__label}>
        Имя:
        <input
          className={styles.change__input}
          type="text"
          {...register("name")}
        />
        {errors.name && <p className="error">{errors.name.message}</p>}
      </label>
      <label className={styles.change__label}>
        Пароль:
        <input
          className={styles.change__input}
          type="password"
          {...register("password")}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}
      </label>
      <label className={styles.change__label}>
        Роль:
        <select className={styles.change__input} {...register("role")}>
          <option value={UserRole.Client}>Клиент</option>
          <option value={UserRole.Librarian}>Библиотекарь</option>
          <option value={UserRole.Admin}>Администратор</option>
        </select>
      </label>
      <button className={styles.change__save} type="submit">
        Сохранить
      </button>
      <button
        className={styles.change__cancel}
        type="button"
        onClick={() => setEditUser(null)}
      >
        Отмена
      </button>
    </form>
  );
}
