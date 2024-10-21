import StudentDashboard from '../pages/Dashboard/StudentDashboard';
import StudentPracticeSessions from '../pages/Student/StudentPracticeSessions';
import ManageCvPage from '../pages/Student/ManageCvPage';
import StudentNewInternships from '../pages/Student/StudentNewInternships';
import StudentInterviews from '../pages/Student/StudentInterviews';
import ProfileSettings from '../pages/Student/StudentProfileSettings';

const STUDENTRoutes = [
  {
    path: "/student/dashboard",
    element: <StudentDashboard />,
    roles: ["ROLE_STUDENT"], 
  },
  {
    path: "/student/student-practice-sessions",
    element: <StudentPracticeSessions />,
    roles: ["ROLE_STUDENT"], 
  },
  {
    path: "/student/manage-cv",
    element: <ManageCvPage />,
    roles: ["ROLE_STUDENT"], 
  },
  {
    path: "/student/student-new-internships",
    element: <StudentNewInternships />,
    roles: ["ROLE_STUDENT"], 
  },
  {
    path: "/student/student-interviews",
    element: <StudentInterviews />,
    roles: ["ROLE_STUDENT"], 
  },
  {
    path: "/student/profile-settings",
    element: <ProfileSettings />,
    roles: ["ROLE_STUDENT"], 
  },
];

export default STUDENTRoutes;
