import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });
  const [users, setUsers] = useState(() => {
    return JSON.parse(localStorage.getItem("users")) || [];
  });

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    const syncUsers = () => {
      setUsers(JSON.parse(localStorage.getItem("users")) || []);
    };

    window.addEventListener("storage", syncUsers);
    return () => window.removeEventListener("storage", syncUsers);
  }, []);

  const login = (name, password) => {
    const usersList = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = usersList.find(
      (u) => u.name === name && u.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const addUser = (name, password, role) => {
    if (users.some((u) => u.name === name)) return false;
    const newUser = { name, password, role };
    setUsers([...users, newUser]);
    return true;
  };

  const updateUser = (updatedUser) => {
    setUsers((prevUsers) => {
      const newUsers = prevUsers.map((user) =>
        user.name === updatedUser.oldName ? updatedUser : user
      );
      localStorage.setItem("users", JSON.stringify(newUsers));
      return newUsers;
    });
  };

  const register = (name, password, role) => {
    if (users.find((u) => u.name === name)) {
      return false;
    }
    const newUser = { name, password, role };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const deleteUser = (name) => {
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
        login,
        register,
        logout,
        deleteUser,
        addUser,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
