import { create } from "zustand";
import { UserRole } from "../constants/UserRoles";
import { User } from "../schemas/authSchema";
import { toast } from "react-toastify";

interface IUpdatedUser extends User {
  oldName: string;
}

export interface IAuthStore {
  user: User | null;
  users: User[];
  newUser: User;
  login: (name: string, password: string) => boolean;
  register: (name: string, password: string, role: UserRole) => boolean;
  logout: () => void;
  deleteUser: (name: string) => void;
  updateUser: (updatedUser: IUpdatedUser) => void;
}

export const useAuthStore = create<IAuthStore>((set, get) => ({
  user: null,
  users: [],
  newUser: { name: "", password: "", role: UserRole.Client },

  login: (name, password) => {
    const foundUser = get().users.find(
      (u) => u.name === name && u.password === password
    );
    if (foundUser) {
      set({ user: foundUser });

      return true;
    }
    toast.error("Неверное имя или пароль!");
    return false;
  },

  register: (name, password, role) => {
    if (get().users.some((u) => u.name === name)) {
      toast.error("Пользователь с таким именем уже существует!");
      return false;
    }
    const newUser = { name, password, role };
    set((state) => ({ users: [...state.users, newUser] }));
    return true;
  },

  logout: () => set({ user: null }),

  deleteUser: (name) => {
    set((state) => ({
      users: state.users.filter((u) => u.name !== name),
      user: state.user?.name === name ? null : state.user,
    }));
  },

  updateUser: (updatedUser) => {
    set((state) => ({
      users: state.users.map((user) =>
        user.name === updatedUser.oldName ? updatedUser : user
      ),
      user: state.user?.name === updatedUser.oldName ? updatedUser : state.user,
    }));
  },
}));
