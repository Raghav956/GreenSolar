import { Navigate } from "react-router-dom";
import { AUTH_TOKEN_KEY } from "../api/client";

export default function ProtectedRoute({

  children,

}) {

  const token =
    localStorage.getItem(
      AUTH_TOKEN_KEY
    );

  if (!token) {

    return (
      <Navigate to="/admin/login" />
    );
  }

  return children;
}
