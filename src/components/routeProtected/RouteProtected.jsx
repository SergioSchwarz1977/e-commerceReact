import { useAuth } from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export const RouteProtected = ({ rolesPermitidos, children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (rolesPermitidos && !rolesPermitidos.includes(user.rol)) {
    return <Navigate to="/" replace />;
  }

  if (children) {
    return children;
  }

  return <Outlet />;
};
