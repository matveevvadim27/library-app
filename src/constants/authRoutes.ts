import API_URL from "./api";
import { token } from "./role";

export interface ILoginType {
  token: string;
}

const AUTH_ROUTES = {
  LOGIN: `${API_URL}/login/`,
  REGISTER: `${API_URL}/register/`,
};

export default AUTH_ROUTES;
