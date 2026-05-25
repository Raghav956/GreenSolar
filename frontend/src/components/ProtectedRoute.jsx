import { Navigate } from "react-router-dom";

export default function ProtectedRoute({

  children,

}) {

  const token =
    localStorage.getItem(
      "greensolar_token"
    );

  if (!token) {

    return (
      <Navigate to="/admin/login" />
    );
  }

  return children;
}