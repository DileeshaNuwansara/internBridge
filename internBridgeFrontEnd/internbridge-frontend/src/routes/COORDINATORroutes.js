import CoordinatorDashboard from '../pages/Dashboard/CoordinatorDashboard';
import ManagePracticeSessions from '../pages/Coordinator/ManagePracticeSessions';
import ManageInterviews from '../pages/Coordinator/ManageInterviews';
import ManageNewInternships from '../pages/Coordinator/ManageNewInternships';
import ManageStudentApplications from '../pages/Coordinator/ManageStudentApplications';
import AdminAddCompanyhr from '../pages/Admin/AdminAddCompanyhr';
import ProfileSettings from '../pages/Coordinator/CoordinatorProfileSettings';
import HiredStudents from '../pages/Coordinator/HiredStudents';
import NotHiredStudents from '../pages/Coordinator/NotHiredStudents';
import NewContacts from '../pages/Coordinator/NewContacts';
const COORDINATORRoutes = [
  {
    path: "/ROLE_COORDINATOR/dashboard",
    element: <CoordinatorDashboard />,
    roles: ["ROLE_COORDINATOR"], 
  },
  {
    path: "/ROLE_COORDINATOR/manage-practice-sessions",
    element: <ManagePracticeSessions />,
    roles: ["ROLE_COORDINATOR"], 
  },
  {
    path: "/ROLE_COORDINATOR/manage-interviews",
    element: <ManageInterviews />,
    roles: ["ROLE_COORDINATOR"], 
  },
  {
    path: "/ROLE_COORDINATOR/manage-new-internships",
    element: <ManageNewInternships />,
    roles: ["ROLE_COORDINATOR"], 
  },
  {
    path: "/ROLE_COORDINATOR/manage-new-companyies",
    element: <NewContacts />,
    roles: ["ROLE_COORDINATOR"], 
  },
  {
    path: "/ROLE_COORDINATOR/hired-students",
    element: <HiredStudents />,
    roles: ["ROLE_COORDINATOR"], 
  },
  {
    path: "/ROLE_COORDINATOR/not-hired-students",
    element: <NotHiredStudents />,
    roles: ["ROLE_COORDINATOR","ROLE_ADMIN"], 
  },
  {
    path: "/ROLE_COORDINATOR/manage-student-applications",
    element: <ManageStudentApplications />,
    roles: ["ROLE_COORDINATOR"], 
  },
  {
    path: "/ROLE_COORDINATOR/add-companyhr",
    element: <AdminAddCompanyhr />,
    roles: ["ROLE_COORDINATOR","ROLE_ADMIN"], 
  },
  {
    path: "/ROLE_COORDINATOR/profile-settings",
    element: <ProfileSettings />,
    roles: ["ROLE_COORDINATOR"], 
  },
];

export default COORDINATORRoutes;
