import api from "api/axios";
import { loginFormData } from "schemas/loginSchema";
import AUTH_ROUTES from "constants/authRoutes";
import { ILoginType } from "constants/authRoutes";

export const login = async (data: loginFormData) => {
  try {
    const response = await api.post<ILoginType>(AUTH_ROUTES.LOGIN, data);
    localStorage.setItem("token", response.data.token);
  } catch (error) {
    console.error("Ошибка авторизации:", error);
  }
};
