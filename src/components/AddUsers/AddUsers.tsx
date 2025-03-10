import { UserRole } from "../../constants/UserRoles";
import { useAuthStore } from "store/authStore";
import { userSchema, User } from "../../schemas/AuthSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

export default function AddUsers() {
  const {
    register: registerUser,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(userSchema),
  });
  const { setNewUser, register } = useAuthStore();

  const handleAddUser = (data: User) => {
    if (register(data.name, data.password, data.role)) {
      setNewUser({ name: "", password: "", role: UserRole.Client });
      toast.success("Пользователь успешно добавлен!");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleAddUser)} className="add">
      <h3 className="change__title">Добавить пользователя:</h3>
      <label className="add__label">
        Имя:
        <input
          className="add__input"
          type="text"
          placeholder="Имя"
          {...registerUser("name")}
        />
        {errors.name && toast.error(errors.name.message)}
      </label>
      <label className="add__label">
        Пароль:
        <input
          className="add__input"
          type="password"
          placeholder="Пароль"
          {...registerUser("password")}
        />
        {errors.password && toast.error(errors.password.message)}
      </label>
      <label className="add__label">
        Роль:
        <select className="add__input" {...registerUser("role")}>
          <option value={UserRole.Client}>Клиент</option>
          <option value={UserRole.Librarian}>Библиотекарь</option>
          <option value={UserRole.Admin}>Администратор</option>
        </select>
        {errors.role && toast.error(errors.role.message)}
      </label>
      <button className="add__button" type="submit">
        Добавить
      </button>
    </form>
  );
}
