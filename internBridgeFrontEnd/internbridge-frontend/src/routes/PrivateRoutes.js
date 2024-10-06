import { Navigate } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const token = localStorage.getItem("token");

  // Redirect to Sign In if no token is found
  if (!token) {
    return <Navigate to="/signin" />;
  }

  return children;  // authenticated, render component
};

export default PrivateRoutes;
