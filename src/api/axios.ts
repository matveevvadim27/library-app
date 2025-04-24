import axios from "axios";
import API_URL from "constants/api";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
};

export default api;

export const fetchCurrentUser = async () => {
  try {
    const response = await api.get<any>("/me");
    return response.data.data;
  } catch (error) {
    console.error("Ошибка при получении текущего пользователя:", error);
    return null;
  }
};
