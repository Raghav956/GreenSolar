import { Navigate } from "react-router-dom";

export default function ProtectedRoute({

  children,

}) {

  const token =
    localStorage.getItem(
      "rbsolarcare_token"
    );

  if (!token) {

    return (
      <Navigate to="/admin/login" />
    );
  }

  return children;
}