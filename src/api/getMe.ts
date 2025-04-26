import { IGetMe, IUser } from "constants/usersRoutes";
import USERS_ROUTES from "constants/usersRoutes";
import api from "./axios";
import { apiErrors } from "utils/apiErrors";

const getMe = async (): Promise<IUser | null> => {
  try {
    const response = await api.get<IGetMe>(USERS_ROUTES.GET_ME);
    const userData = response.data.data;
    return userData;
  } catch (error) {
    apiErrors(error);
    return null;
  }
};

export default getMe;
