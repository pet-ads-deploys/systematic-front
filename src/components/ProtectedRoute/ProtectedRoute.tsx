import React from "react";
import { Navigate } from "react-router-dom";
import { useVerifyIfLoggedIn } from "../../features/auth/services/useVerifyIfLoggedIn";
import LoadingPage from "../../pages/LoadingPage/loadingPage";

interface ProtectedRouteProps {
  element: JSX.Element;
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
