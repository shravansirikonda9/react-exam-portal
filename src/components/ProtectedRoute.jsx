import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem("isAuthenticated");

  if (isAuth !== "true") {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
