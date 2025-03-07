import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserRole } from "../constants/UserRoles";

interface User {
  name: string;
  password: string;
  role: UserRole;
}

interface UpdatedUser extends User {
  oldName: string;
}

interface AuthContextType {
  user: User | null;
  users: User[];
  newUser: User;
  setNewUser: React.Dispatch<React.SetStateAction<User>>;
  login: (name: string, password: string) => boolean;
  register: (name: string, password: string, role: string) => boolean;
  logout: () => void;
  deleteUser: (name: string) => void;
  updateUser: (updatedUser: UpdatedUser) => void;
  handleAddUser: (e: React.FormEvent<HTMLFormElement>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const storedUsers = localStorage.getItem("users");
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  const [newUser, setNewUser] = useState<User>({
    name: "",
    password: "",
    role: UserRole.Client,
  });

  const handleAddUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (register(newUser.name, newUser.password, newUser.role)) {
      setNewUser({ name: "", password: "", role: UserRole.Client });
    }
  };

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    const syncUsers = () => {
      const storedUsers = localStorage.getItem("users");
      setUsers(storedUsers ? JSON.parse(storedUsers) : []);
    };

    window.addEventListener("storage", syncUsers);
    return () => window.removeEventListener("storage", syncUsers);
  }, []);

  const login = (name: string, password: string): boolean => {
    const storedUsers = localStorage.getItem("users");
    const usersList: User[] = storedUsers ? JSON.parse(storedUsers) : [];
    const foundUser = usersList.find(
      (u) => u.name === name && u.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const register = (name: string, password: string, role: string): boolean => {
    if (!name.trim() || !password.trim()) {
      toast.error("Все поля должны быть заполнены!");
      return false;
    }
    if (users.find((u) => u.name === name)) {
      toast.error("Имя уже занято!");
      return false;
    }
    setUsers((prevUsers) => [
      ...prevUsers,
      { name, password, role: role as UserRole },
    ]);
    toast.success("Пользователь успешно добавлен!");
    return true;
  };

  const updateUser = (updatedUser: UpdatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.name === updatedUser.oldName
          ? {
              name: updatedUser.name,
              password: updatedUser.password,
              role: updatedUser.role,
            }
          : user
      )
    );
  };

  const logout = () => {
    setUser(null);
  };

  const deleteUser = (name: string) => {
    const updatedUsers = users.filter((u) => u.name !== name);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    if (user?.name === name) {
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        newUser,
        login,
        register,
        logout,
        deleteUser,
        updateUser,
        handleAddUser,
        setNewUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
