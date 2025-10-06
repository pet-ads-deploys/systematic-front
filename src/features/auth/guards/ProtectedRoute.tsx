// External library
import React from "react";
import { Navigate } from "react-router-dom";

// Hooks
import { useAuthStore } from "../store/useAuthStore";

// Page Component
import LoadingPage from "../../application/pages/LoadingPage";

// Types
interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { user, _hasHydrated } = useAuthStore();

  if (!_hasHydrated) {
    return <LoadingPage />;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default ProtectedRoute;
