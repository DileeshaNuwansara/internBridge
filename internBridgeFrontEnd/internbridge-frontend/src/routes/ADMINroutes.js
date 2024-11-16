import userRoles from "../userRoles/userRoles";
import AdminDashboard from '../pages/Dashboard/AdminDashboard';
import AdminAddStudent from '../pages/Admin/AdminAddStudent';
//import Register from '../pages/Register/Register';
import NotHiredStudents from "../pages/Coordinator/NotHiredStudents";
import AdminAddCompanyhr from '../pages/Admin/AdminAddCompanyhr';
import AdminAddCoordinator from '../pages/Admin/AdminAddCoordinator';
import ProfileSettings from '../pages/Admin/AdminProfileSettings';
import AdminAddAdmin from "../pages/Admin/AdminAddAdmin";
import ApprovedContacts from "../pages/Admin/ApprovedContacts";
import AppSettings from "../pages/Admin/AppSettings";

const ADMINRoutes = [
    {
        path : "/ROLE_ADMIN/dashboard",
        element: <AdminDashboard/>,
        roles: ["ROLE_ADMIN"],
    },
    {
        path:"/ROLE_ADMIN/add-student",
        element:<AdminAddStudent/>,
        roles:[userRoles.admin,userRoles.coordinator]
    },
    {
        path:"/ROLE_ADMIN/add-admin",
        element:<AdminAddAdmin/>,
        roles:[userRoles.admin]
    },
    {
        path:"/ROLE_ADMIN/add-companyhr",
        element:<AdminAddCompanyhr/>,
        roles:[userRoles.admin,userRoles.coordinator]
    },
    {
        path:"/ROLE_ADMIN/add-company",
        element:<ApprovedContacts/>,
        roles:[userRoles.admin,userRoles.coordinator]
    },
    {
        path:"/ROLE_ADMIN/add-Coordinator",
        element:<AdminAddCoordinator/>,
        roles:[userRoles.admin]
    },
    {
        path: "/ROLE_ADMIN/profile-settings",
        element: <ProfileSettings />,
        roles: ["ROLE_ADMIN"], 
      },
    //   {
    //     path: "/ROLE_ADMIN/app-settings",
    //     element: <AppSettings/>,
    //     roles: ["ROLE_ADMIN"], 
    //   },
      {
        path: "/ROLE_ADMIN/not-hired-students",
        element: <NotHiredStudents/>,
        roles: ["ROLE_COORDINATOR","ROLE_ADMIN"], 
      },
    
]

export  default ADMINRoutes;