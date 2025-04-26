import styles from "./EditUsers.module.scss";
import { IUser } from "../../../../store/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { editSchema, editFormData } from "../../../../schemas/editSchema";

interface IEditUserFormProps {
  user: IUser;
  onClose: () => void;
}

const EditUser: React.FC<IEditUserFormProps> = ({ user, onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<editFormData>({
    resolver: zodResolver(editSchema),
    defaultValues: user,
  });
  const onSubmit = async (data: editFormData) => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.change}>
      <label className={styles.change__label}>
        Логин:
        <input className={styles.change__input} type="text" disabled />
      </label>
      <label className={styles.change__label}>
        Email:
        <input className={styles.change__input} type="text" disabled />
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
