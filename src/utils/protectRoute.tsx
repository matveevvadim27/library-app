import { Navigate, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Roles } from "../constants/constants";
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
  const { currentUser } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/auth");
    }
  }, [currentUser, navigate]);

  if (currentUser && !allowedRoles.includes(currentUser!.role)) {
    return <Navigate to="/" />;
  }

  return children as ReactElement;
};

export default ProtectRoute;
