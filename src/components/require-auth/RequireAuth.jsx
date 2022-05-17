import { Navigate, useLocation } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const encodedToken = localStorage.getItem("token");
  const { pathname } = useLocation();

  return encodedToken ? (
    children
  ) : (
    <Navigate to="/signin" state={{ from: { pathname } }} replace />
  );
};

export { RequireAuth };
