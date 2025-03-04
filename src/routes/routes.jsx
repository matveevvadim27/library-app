import { Routes, Route } from "react-router-dom";
import Login from "../pages/Auth/Login";
import RegisterPage from "../pages/Register/RegisterPage";
import Home from "../pages/Home/Home";
import Client from "../pages/Client/Client";
import Edit from "../pages/Edit/Edit";
import Admin from "../pages/Admin/Admin";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/client"
        element={
          <PrivateRoute allowedRoles={["client", "librarian", "admin"]}>
            <Client />
          </PrivateRoute>
        }
      />
      <Route
        path="/edit"
        element={
          <PrivateRoute allowedRoles={["librarian", "admin"]}>
            <Edit />
          </PrivateRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <Admin />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}
