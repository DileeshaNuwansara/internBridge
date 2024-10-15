import { Navigate } from 'react-router-dom';

const RoleRoute = ({ children, allowedRoles }) => {
  const userRole = localStorage.getItem("role");  // get user role from localStorage or auth context

  // If the role is not allowed, redirect to NoPage or any other page
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/nopage" />;
  }

  return children;  // authorized role, render component
};

export default RoleRoute;
