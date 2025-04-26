import { Navigate, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { Roles } from "../constants/roles";
import { ReactNode, ReactElement } from "react";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles: Roles[];
}

const ProtectRoute = ({
  children,
  allowedRoles,
}: ProtectedRouteProps): ReactElement | null => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  if (user && !allowedRoles.includes(user!.role!)) {
    return <Navigate to="/" />;
  }

  return children as ReactElement;
};

export default ProtectRoute;
