import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// Protege una ruta: exige sesión iniciada y, opcionalmente, un rol específico.
const ProtectedRoute = ({ rol, children }) => {
  const { usuarioActual } = useAuth();

  if (!usuarioActual) return <Navigate to="/" replace />;
  if (rol && usuarioActual.rol !== rol) return <Navigate to="/" replace />;

  return children;
};

export default ProtectedRoute;
