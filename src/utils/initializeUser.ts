import getMe from "api/getMe";
import getToken from "./getToken";
import { useAuthStore } from "store/useAuthStore";
import { apiErrors } from "./apiErrors";

export const initializeUser = async () => {
  const { setUser, logout, setLoading } = useAuthStore.getState();

  const token = getToken();
  if (token) {
    try {
      const userResponce = await getMe();
      if (userResponce) {
        setUser(userResponce);
      } else {
        logout();
      }
    } catch (error) {
      apiErrors(error);
      logout();
    }
  }
  setLoading(false);
};
