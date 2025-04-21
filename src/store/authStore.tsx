import { create } from "zustand";

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: number;
}

interface IUserState {
  currentUser: IUser | null;
  users: IUser[];
  isLoading: boolean;
  setUser: (user: IUser) => void;
  setUsers: (users: IUser[] | ((prev: IUser[]) => IUser[])) => void;
  setLoading: (isLoading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<IUserState>((set) => ({
  currentUser: null,

  users: [],

  isLoading: true,

  setUsers: (users) =>
    set((state) => ({
      users: typeof users === "function" ? users(state.users) : users,
    })),

  setUser: (user) => set({ currentUser: user }),

  setLoading: (isLoading) => set({ isLoading }),

  logout: () => {
    localStorage.removeItem("token");
    set({ currentUser: null });
  },
}));
