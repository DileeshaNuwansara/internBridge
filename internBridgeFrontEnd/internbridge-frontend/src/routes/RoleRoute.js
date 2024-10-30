import { useEffect, useState } from "react";

import { Navigate } from 'react-router-dom';

const RoleRoute = ({ children, allowedRoles }) => {
  const [userRole, setUserRole] = useState(localStorage.getItem("role"));
  useEffect(() => {
  const userRole = localStorage.getItem("role");
  if(userRole){
    setUserRole(userRole);

  }
    console.log('User role from localStorage:', localStorage.getItem("role"));

  },[]);

  if (!userRole) {
    return null;
  }
  
  
  // If the role is not allowed, redirect to NoPage or any other page
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/nopage" />;
  }

  return children;  // authorized role, render component
};

export default RoleRoute;
