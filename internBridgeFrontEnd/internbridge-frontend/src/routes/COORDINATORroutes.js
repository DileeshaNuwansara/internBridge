import CoordinatorDashboard from '../pages/Dashboard/CoordinatorDashboard';
import ManagePracticeSessions from '../pages/Coordinator/ManagePracticeSessions';
import ManageInterviews from '../pages/Coordinator/ManageInterviews';
import ManageNewInternships from '../pages/Coordinator/ManageNewInternships';
import ManageStudentApplications from '../pages/Coordinator/ManageStudentApplications';
import ManageCompanyHR from '../pages/Coordinator/ManageCompanyHR';
import ProfileSettings from '../pages/Coordinator/ProfileSettings';

const COORDINATORRoutes = [
  {
    path: "/coordinator/dashboard",
    element: <CoordinatorDashboard />,
    roles: ["ROLE_COORDINATOR"], 
  },
  {
    path: "/coordinator/manage-practice-sessions",
    element: <ManagePracticeSessions />,
    roles: ["ROLE_COORDINATOR"], 
  },
  {
    path: "/coordinator/manage-interviews",
    element: <ManageInterviews />,
    roles: ["ROLE_COORDINATOR"], 
  },
  {
    path: "/coordinator/manage-new-internships",
    element: <ManageNewInternships />,
    roles: ["ROLE_COORDINATOR"], 
  },
  {
    path: "/coordinator/manage-student-applications",
    element: <ManageStudentApplications />,
    roles: ["ROLE_COORDINATOR"], 
  },
  {
    path: "/coordinator/manage-company-hr",
    element: <ManageCompanyHR />,
    roles: ["ROLE_COORDINATOR","ROLE_ADMIN"], 
  },
  {
    path: "/coordinator/profile-settings",
    element: <ProfileSettings />,
    roles: ["ROLE_COORDINATOR"], 
  },
];

export default COORDINATORRoutes;
