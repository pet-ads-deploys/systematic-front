// External library
import React from "react";
import { Navigate } from "react-router-dom";

// Services
import { useVerifyIfLoggedIn } from "../services/useVerifyIfLoggedIn";

// Page Component
import LoadingPage from "../../application/pages/LoadingPage";

// Types
interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isLoggedIn, isChecking } = useVerifyIfLoggedIn();

  if (isChecking) {
    return <LoadingPage />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/unauthorized" replace />;
  }

  return element;
};

export default ProtectedRoute;
