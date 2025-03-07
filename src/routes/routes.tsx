import { Routes, Route } from "react-router-dom";
import Login from "../pages/Auth/Login";
import RegisterPage from "../pages/Register/RegisterPage";
import Home from "../pages/Home/Home";
import Client from "../pages/Client/Client";
import Edit from "../pages/Edit/Edit";
import Admin from "../pages/Admin/Admin";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import { UserRole } from "../constants/UserRoles";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/client"
        element={
          <PrivateRoute
            allowedRoles={[UserRole.Client, UserRole.Librarian, UserRole.Admin]}
          >
            <Client />
          </PrivateRoute>
        }
      />
      <Route
        path="/edit"
        element={
          <PrivateRoute allowedRoles={[UserRole.Librarian, UserRole.Admin]}>
            <Edit />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <PrivateRoute allowedRoles={[UserRole.Admin]}>
            <Admin />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}
