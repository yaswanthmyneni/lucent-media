import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const encodedToken = localStorage.getItem("token");
  const location = useLocation();

  return encodedToken ? (
    children
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export { RequireAuth };
