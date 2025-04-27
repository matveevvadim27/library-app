import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Roles } from "../constants/roles";
import { ReactNode, ReactElement } from "react";
import { toast } from "react-toastify";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: Roles[];
}

const ProtectRoute = ({
  children,
  allowedRoles,
}: ProtectedRouteProps): ReactElement | null => {
  const { user } = useAuthStore();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (!user.role || !allowedRoles.includes(user.role)) {
    toast.error("У вас недостаточно прав!");
    return <Navigate to="/" replace />;
  }

  return children as ReactElement;
};

export default ProtectRoute;
