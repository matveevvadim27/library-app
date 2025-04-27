import styles from "./EditUsers.module.scss";
import { IUser } from "../../../../store/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { editSchema, editFormData } from "../../../../schemas/editUserSchema";
import { useUsers } from "hooks/useUsers";

interface IEditUserFormProps {
  user: IUser;
  onClose: () => void;
}

const EditUser: React.FC<IEditUserFormProps> = ({ user, onClose }) => {
  const { putChangeUser } = useUsers();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<editFormData>({
    resolver: zodResolver(editSchema),
    defaultValues: user,
  });
  const handleEditUser = async (data: editFormData) => {
    await putChangeUser(data);
  };

  return (
    <form onSubmit={handleSubmit(handleEditUser)} className={styles.change}>
      <h2 className={styles.change__title}>Редактирование пользователя</h2>
      <label className={styles.change__label}>
        Имя:
        <input
          className={styles.change__input}
          type="text"
          placeholder="Имя"
          value={user.name}
          disabled
        />
      </label>
      <label className={styles.change__label}>
        Email:
        <input
          className={styles.change__input}
          type="text"
          placeholder="Пароль"
          value={user.email}
          disabled
        />
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
      <button className={styles.change__save} type="submit">
        Сохранить
      </button>
      <button className={styles.change__cancel} type="button" onClick={onClose}>
        Отмена
      </button>
    </form>
  );
};
export default EditUser;
