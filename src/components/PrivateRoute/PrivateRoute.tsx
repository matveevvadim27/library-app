import { Navigate } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { UserRole } from "../../constants/UserRoles";
import "react-toastify/dist/ReactToastify.css";
import { ReactNode } from "react";
import { useAuthStore } from "store/authStore";

interface PrivateRouteProps {
  children: ReactNode;
  allowedRoles: UserRole[];
}

export default function PrivateRoute({
  children,
  allowedRoles,
}: PrivateRouteProps) {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    toast.error("У вас недостаточно прав!");
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
