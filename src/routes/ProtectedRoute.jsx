import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useUserAuth();

  if (loading) return null;

  if (!user) return <Navigate to="/auth/login" replace />;

  return children;
}