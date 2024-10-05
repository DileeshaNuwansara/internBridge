import StudentDashboard from '../pages/Dashboard/StudentDashboard';
import PracticeSessions from '../pages/Student/PracticeSessions';
import ManageCV from '../pages/Student/ManageCV';
import InternshipDetails from '../pages/Student/InternshipDetails';
import Interviews from '../pages/Student/Interviews';
import ProfileSettings from '../pages/Student/ProfileSettings';

const STUDENTRoutes = [
  {
    path: "/student/dashboard",
    element: <StudentDashboard />,
    roles: ["ROLE_STUDENT"], 
  },
  {
    path: "/student/practice-sessions",
    element: <PracticeSessions />,
    roles: ["ROLE_STUDENT"], 
  },
  {
    path: "/student/manage-cv",
    element: <ManageCV />,
    roles: ["ROLE_STUDENT"], 
  },
  {
    path: "/student/internship-details",
    element: <InternshipDetails />,
    roles: ["ROLE_STUDENT"], 
  },
  {
    path: "/student/interviews",
    element: <Interviews />,
    roles: ["ROLE_STUDENT"], 
  },
  {
    path: "/student/profile-settings",
    element: <ProfileSettings />,
    roles: ["ROLE_STUDENT"], 
  },
];

export default STUDENTRoutes;
