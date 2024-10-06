// import { Navigate } from "react-router-dom";
// import jwt_decode from "jwt-decode"; 

// const RoleRoute = ({ allowedRoles, children }) => {
//   const token = localStorage.getItem("token");
//   //token comes with the role from bakend.. ckeck role validate 
//   if (token) {
//     const decodedToken = jwt_decode(token);
//     const userRole = decodedToken.role; // JWT contains a 'role' field
    
//     // Check if the user's role matches the allowed roles
//     if (allowedRoles.includes(userRole)) {
//       return children;
//     }
//   }

//   return <Navigate to="/nopage" />;  // not authorized
// };

// export default RoleRoute;
