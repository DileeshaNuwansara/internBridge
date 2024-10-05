import userRoles from "../userRoles/userRoles";
import AdminDashboard from '../pages/Dashboard/AdminDashboard';
import AdminAddStudent from '../pages/Admin/admin-add-student';
import AdminAddAdmin from '../pages/Admin/admin-add-admin';
import AdminAddCompanyhr from '../pages/Admin/admin-add-companyhr';
import AdminAddCoordinator from '../pages/Admin/admin-add-coordinator';


const ADMINRoutes = [
    {
        path : "ADMIN/dashboard",
        element: <AdminDashboard/>,
        availability : [userRoles.admin,userRoles.student,userRoles.coordinator,userRoles.companyhr]
    },
    {
        path:"ADMIN/addStudent",
        element:<AdminAddStudent/>,
        availability:[userRoles.admin,userRoles.coordinator]
    },
    {
        path:"ADMIN/addAdmin",
        element:<AdminAddAdmin/>,
        availability:[userRoles.admin]
    },
    {
        path:"ADMIN/addCompanyhr",
        element:<AdminAddCompanyhr/>,
        availability:[userRoles.admin,userRoles.coordinator]
    },
    {
        path:"ADMIN/addCoordinator",
        element:<AdminAddCoordinator/>,
        availability:[userRoles.admin,userRoles.coordinator]
    }
]

export  default ADMINRoutes;