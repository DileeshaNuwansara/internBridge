import StudentDashboard from '../pages/Dashboard/StudentDashboard';
import ManagePracticeSessions from '../pages/Coordinator/ManagePracticeSessions';
import ManageCvPage from '../pages/Student/ManageCvPage';
import ManageNewInternships from '../pages/Coordinator/ManageNewInternships';
import ManageInterviews from '../pages/Coordinator/ManageInterviews';
import ProfileSettings from '../pages/Student/StudentProfileSettings';

const STUDENTRoutes = [
  {
    path: "/student/dashboard",
    element: <StudentDashboard />,
    roles: ["ROLE_STUDENT"], 
  },
  {
    path: "/student/manage-practice-sessions",
    element: <ManagePracticeSessions />,
    roles: ["ROLE_STUDENT","ROLE_COORDINATOR"], 
  },
  {
    path: "/student/manage-cv",
    element: <ManageCvPage />,
    roles: ["ROLE_STUDENT"], 
  },
  {
    path: "/student/manage-new-internships",
    element: <ManageNewInternships />,
    roles: ["ROLE_STUDENT","ROLE_COORDINATOR"], 
  },
  {
    path: "/student/manage-interviews",
    element: <ManageInterviews />,
    roles: ["ROLE_STUDENT","ROLE_COORDINATOR"], 
  },
  {
    path: "/student/profile-settings",
    element: <ProfileSettings />,
    roles: ["ROLE_STUDENT"], 
  },
];

export default STUDENTRoutes;
