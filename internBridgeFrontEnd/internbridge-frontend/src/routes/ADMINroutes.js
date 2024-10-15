import userRoles from "../userRoles/userRoles";
import AdminDashboard from '../pages/Dashboard/AdminDashboard';
import AdminAddStudent from '../pages/Admin/AdminAddStudent';
//import Register from '../pages/Register/Register';

import AdminAddCompanyhr from '../pages/Admin/AdminAddCompanyhr';
import AdminAddCoordinator from '../pages/Admin/AdminAddCoordinator';
import ProfileSettings from '../pages/Admin/AdminProfileSettings';
import AdminAddAdmin from "../pages/Admin/AdminAddAdmin";

const ADMINRoutes = [
    {
        path : "/admin/dashboard",
        element: <AdminDashboard/>,
        roles: ["ROLE_ADMIN"],
    },
    {
        path:"/admin/add-student",
        element:<AdminAddStudent/>,
        roles:[userRoles.admin,userRoles.coordinator]
    },
    {
        path:"/admin/add-admin",
        element:<AdminAddAdmin/>,
        roles:[userRoles.admin]
    },
    {
        path:"/admin/add-companyhr",
        element:<AdminAddCompanyhr/>,
        roles:[userRoles.admin,userRoles.coordinator]
    },
    {
        path:"/admin/add-Coordinator",
        element:<AdminAddCoordinator/>,
        roles:[userRoles.admin]
    },
    {
        path: "/admin/profile-settings",
        element: <ProfileSettings />,
        roles: ["ROLE_ADMIN"], 
      },
    
]

export  default ADMINRoutes;