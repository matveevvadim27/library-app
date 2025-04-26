import api from "api/axios";
import { loginFormData } from "schemas/loginSchema";
import { RegisterFormData } from "schemas/registerSchema";
import AUTH_ROUTES from "constants/authRoutes";
import { ILoginType } from "constants/authRoutes";
import { IRegisterType } from "constants/authRoutes";
import { apiErrors } from "utils/apiErrors";
import { toast } from "react-toastify";
import { useAuthStore } from "store/useAuthStore";
import { useUsers } from "./useUsers";
import getToken from "utils/getToken";

export const useAuth = () => {
  const { setUser, setToken } = useAuthStore();
  const { getMe } = useUsers();

  const login = async (data: loginFormData) => {
    try {
      const response = await api.post<ILoginType>(AUTH_ROUTES.LOGIN, data);
      const token = response.data.token;
      localStorage.setItem("token", response.data.token);
      setToken(token);

      const userResponse = await getMe();
      const user = userResponse?.data;
      setUser(user!);
    } catch (error) {
      apiErrors(error, "Ошибка при получении данных пользователя");
      return null;
    }
  };
  const register = async (data: RegisterFormData) => {
    try {
      await api.post<IRegisterType>(AUTH_ROUTES.REGISTER, data);
      toast.success("Регистрация прошла успешно!");
    } catch (error) {
      apiErrors(error);
      return null;
    }
  };
  return { login, register };
};
