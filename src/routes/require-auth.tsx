import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {
  const user = {
    name: "John Doe",
    email: "johndoe@gmail.com",
  };
  // const user = null;
  const location = useLocation();
  return (
    <>
      {user !== null ? (
        <Outlet />
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </>
  );
};

export default RequireAuth;
