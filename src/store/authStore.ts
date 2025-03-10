import { create } from "zustand";
import { UserRole } from "../constants/UserRoles";

export interface User {
  name: string;
  password: string;
  role: UserRole;
}

interface UpdatedUser extends User {
  oldName: string;
}

interface IAuthStore {
  user: User | null;
  users: User[];
  newUser: User;
  login: (name: string, password: string) => boolean;
  register: (name: string, password: string, role: UserRole) => boolean;
  logout: () => void;
  deleteUser: (name: string) => void;
  updateUser: (updatedUser: UpdatedUser) => void;
  setNewUser: (user: User) => void;
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
    return false;
  },

  register: (name, password, role) => {
    if (!name.trim() || !password.trim()) {
      return false;
    }
    if (get().users.some((u) => u.name === name)) {
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
        user.name === updatedUser.oldName
          ? {
              name: updatedUser.name,
              password: updatedUser.password,
              role: updatedUser.role,
            }
          : user
      ),
      user:
        state.user?.name === updatedUser.oldName
          ? {
              name: updatedUser.name,
              password: updatedUser.password,
              role: updatedUser.role,
            }
          : state.user,
    }));
  },

  setNewUser: (user) => set({ newUser: user }),
}));
