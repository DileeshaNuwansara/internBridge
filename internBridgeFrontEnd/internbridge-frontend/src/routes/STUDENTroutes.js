import StudentDashboard from '../pages/Dashboard/StudentDashboard';
import StudentPracticeSessions from '../pages/Student/StudentPracticeSessions';
import ManageCvPage from '../pages/Student/ManageCvPage';
import StudentNewInternships from '../pages/Student/StudentNewInternships';
import StudentInterviews from '../pages/Student/StudentInterviews';
import ProfileSettings from '../pages/Student/StudentProfileSettings';
import AppliedInternships from '../pages/Student/AppliedInternships';

const STUDENTRoutes = [
  {
    path: "/ROLE_STUDENT/dashboard",
    element: <StudentDashboard />,
    roles: ["ROLE_STUDENT"], 
  },
  {
    path: "/ROLE_STUDENT/student-practice-sessions",
    element: <StudentPracticeSessions />,
    roles: ["ROLE_STUDENT"], 
  },
  {
    path: "/ROLE_STUDENT/manage-cv",
    element: <ManageCvPage />,
    roles: ["ROLE_STUDENT"], 
  },
  {
    path: "/ROLE_STUDENT/student-new-internships",
    element: <StudentNewInternships />,
    roles: ["ROLE_STUDENT"], 
  },
  {
    path: "/ROLE_STUDENT/student-interviews",
    element: <StudentInterviews />,
    roles: ["ROLE_STUDENT"], 
  },
  {
    path: "/ROLE_STUDENT/profile-settings",
    element: <ProfileSettings />,
    roles: ["ROLE_STUDENT"], 
  },
  {
    path:"ROLE_STUDENT/applied-internships",
    element:<AppliedInternships/>,
    roles:["ROLE_STUDENT"]
  },
];

export default STUDENTRoutes;
