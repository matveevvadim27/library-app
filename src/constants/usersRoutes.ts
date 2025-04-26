import API_URL from "./api";

export interface IUser {
  id: number;
  name: string;
  email: string;
  role: number;
}

export interface IGetMe {
  data: IUser;
}

export interface IGetUsers {
  data: IUser[];
}

const USERS_ROUTES = {
  GET_ME: `${API_URL}/me`,
  GET_USERS: `${API_URL}/users`,
  POST_USER: `${API_URL}/users`,
  PUT_CHANGE_USER: (id: number) => `${API_URL}/users/${id}`,
  DELETE_USER: (id: number) => `${API_URL}/users/${id}`,
};

export default USERS_ROUTES;
