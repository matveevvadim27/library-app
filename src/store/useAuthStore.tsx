import { create } from "zustand";

export interface IUser {
  id: number;
  name: string;
  email: string;
  password?: string;
  role?: number;
}

interface IUserState {
  user: IUser | null;
  users: IUser[];
  isLoading: boolean;
  token: string | null;
  setToken: (token: string | null) => void;
  setUser: (user: IUser) => void;
  setUsers: (users: IUser[] | ((prev: IUser[]) => IUser[])) => void;
  setLoading: (isLoading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<IUserState>((set, get) => ({
  user: null,

  users: [],

  isLoading: true,

  token: null,

  setToken: (token) => {
    set({ token: token });
  },

  setUsers: (users) =>
    set((state) => ({
      users: typeof users === "function" ? users(state.users) : users,
    })),

  setUser: (user) => set({ user: user }),

  setLoading: (isLoading) => set({ isLoading }),

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null });
  },
}));
