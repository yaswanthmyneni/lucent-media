import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {
  const encodedToken = localStorage.getItem("token");
  const location = useLocation();

  return encodedToken ? (
    <Outlet />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export { RequireAuth };
