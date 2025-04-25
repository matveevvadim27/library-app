import api from "api/axios";
import { loginFormData } from "schemas/loginSchema";
import { RegisterFormData } from "schemas/registerSchema";
import AUTH_ROUTES from "constants/authRoutes";
import { ILoginType } from "constants/authRoutes";
import { IRegisterType } from "constants/authRoutes";
import { apiErrors } from "utils/apiErrors";
import { toast } from "react-toastify";

export const useAuth = () => {
  const login = async (data: loginFormData) => {
    try {
      const response = await api.post<ILoginType>(AUTH_ROUTES.LOGIN, data);
      localStorage.setItem("token", response.data.token);
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
