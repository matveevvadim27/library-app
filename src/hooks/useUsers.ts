import api from "api/axios";
import USERS_ROUTES from "constants/usersRoutes";
import { apiErrors } from "utils/apiErrors";
import { IGetMe, IGetUsers } from "constants/usersRoutes";
import { AddFormData } from "schemas/addSchema";
import { toast } from "react-toastify";

export const useUsers = () => {
  const getMe = async () => {
    try {
      const response = await api.get<IGetMe>(USERS_ROUTES.GET_ME);
      const userData = response.data;
      return userData;
    } catch (error) {
      apiErrors(error);
      return null;
    }
  };

  const getUsers = async () => {
    try {
      const response = await api.get<IGetUsers>(USERS_ROUTES.GET_USERS);
      const usersList = response.data.data;
      return usersList;
    } catch (error) {
      apiErrors(error);
      return null;
    }
  };

  const postUser = async (data: AddFormData) => {
    try {
      await api.post(USERS_ROUTES.POST_USER, data);
      toast.success("Пользователь успешно добавлен!");
    } catch (error) {
      apiErrors(error);
      return null;
    }
  };

  const putChangeUser = async (id: number, password: string) => {
    try {
      await api.put(USERS_ROUTES.PUT_CHANGE_USER(id), password);
      toast.success("Пользователь успешно изменен!");
    } catch (error) {
      apiErrors(error);
      return null;
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await api.delete(USERS_ROUTES.DELETE_USER(id));
      toast.success("Пользователь успешно удален!");
    } catch (error) {
      apiErrors(error);
      return null;
    }
  };

  return { getMe, getUsers, postUser, putChangeUser, deleteUser };
};
