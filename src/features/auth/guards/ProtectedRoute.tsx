// External library
import React from "react";
import { Navigate } from "react-router-dom";

// Hooks
import { useAuth } from "../hooks/useAuth";

// Page Component
import LoadingPage from "../../application/pages/LoadingPage";
import { isLeft } from "@features/shared/errors/pattern/Either";

// Types
interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const authResult = useAuth();

  if (isLeft(authResult)) {
    return <Navigate to="/" replace />;
  }

  const { user, isLoading } = authResult.value;

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!user) {
    return <Navigate to="/unauthorized" replace />;
  }

  return element;
};

export default ProtectedRoute;
