import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Admin from "../pages/Admin/Admin";
import Librarian from "../pages/Librarian/Librarian";
import Library from "../pages/Library/Library";
import Auth from "../pages/Auth/Auth";
import ProtectRoute from "../utils/protectRoute";
import { Roles } from "../constants/constants";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/admin"
        element={
          <ProtectRoute allowedRoles={[Roles.ADMIN]}>
            <Admin />
          </ProtectRoute>
        }
      />
      <Route
        path="/librarian"
        element={
          <ProtectRoute allowedRoles={[Roles.ADMIN, Roles.LIBRARIAN]}>
            <Librarian />
          </ProtectRoute>
        }
      />
      <Route
        path="/library"
        element={
          <ProtectRoute
            allowedRoles={[Roles.ADMIN, Roles.LIBRARIAN, Roles.CLIENT]}
          >
            <Library />
          </ProtectRoute>
        }
      />
      <Route path="/auth" element={<Auth />} />
    </Routes>
  );
}
