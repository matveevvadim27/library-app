import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import { UserRole } from "../../constants/UserRoles";
import { useAuthStore } from "store/authStore";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, User } from "../../schemas/AuthSchema";

interface AdminProps {
  editUser: User;
  setEditUser: Dispatch<SetStateAction<User | null>>;
}

export default function EditUsers({ editUser, setEditUser }: AdminProps) {
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
    <form onSubmit={handleSubmit(onSubmit)} className="change">
      <h3 className="change__title">Редактировать: {editUser.name}</h3>
      <label className="change__label">
        Имя:
        <input className="change__input" type="text" {...register("name")} />
        {errors.name && toast.error(errors.name.message)}
      </label>
      <label className="change__label">
        Пароль:
        <input
          className="change__input"
          type="password"
          {...register("password")}
        />
        {errors.password && toast.error(errors.password.message)}
      </label>
      <label className="change__label">
        Роль:
        <select className="change__input" {...register("role")}>
          <option value={UserRole.Client}>Клиент</option>
          <option value={UserRole.Librarian}>Библиотекарь</option>
          <option value={UserRole.Admin}>Администратор</option>
        </select>
        {errors.role && toast.error(errors.role.message)}
      </label>
      <button className="change__save" type="submit">
        Сохранить
      </button>
      <button
        className="change__cancel"
        type="button"
        onClick={() => setEditUser(null)}
      >
        Отмена
      </button>
    </form>
  );
}
