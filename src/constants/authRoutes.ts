import API_URL from "./api";

export interface ILoginType {
  token: string;
}

export interface IRegisterType {
  data: {
    id: number;
    name: string;
    email: string;
    role: number;
  };
}

const AUTH_ROUTES = {
  LOGIN: `${API_URL}/login`,
  REGISTER: `${API_URL}/register`,
};

export default AUTH_ROUTES;
