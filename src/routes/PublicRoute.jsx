import { Navigate } from "react-router-dom";
import { useUserAuth } from "../context/UserContext";

export default function PublicRoute({ children }) {
  const { user, loading } = useUserAuth();

  if (loading) return null;

  if (user) return <Navigate to="/" replace />;

  return children;
}