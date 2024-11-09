import CompanyhrDashboard from '../pages/Dashboard/CompanyhrDashboard';
import InternshipDetails from '../pages/CompanyHR/InternshipDetails';
import InterviewDetails from '../pages/CompanyHR/InterviewDetails';
import ManagePracticeSessions from '../pages/CompanyHR/ManagePracticeSessions';
import ActiveInternsStatus from '../pages/CompanyHR/ActiveInternsStatus';
import ProfileSettings from '../pages/CompanyHR/CompanyHRProfileSettings';
import ManageCvPage from '../pages/CompanyHR/ManageCvPage';
import ViewAppliedStudents from '../pages/CompanyHR/ViewAppliedStudents';

const COMPANYHRRoutes = [
  {
    path: "/ROLE_COMPANYHR/dashboard",
    element: <CompanyhrDashboard />,
    roles: ["ROLE_COMPANYHR"], 
  },
  {
    path: "/ROLE_COMPANYHR/internship-details",
    element: <InternshipDetails />,
    roles: ["ROLE_COMPANYHR"], 
  },
  {
    path: "/ROLE_COMPANYHR/interview-details",
    element: <InterviewDetails />,
    roles: ["ROLE_COMPANYHR"], 
  },
  {
    path: "/ROLE_COMPANYHR/manage-practice-sessions",
    element: <ManagePracticeSessions />,
    roles: ["ROLE_COMPANYHR"], 
  },
  {
    path: "/ROLE_COMPANYHR/active-interns-status",
    element: <ActiveInternsStatus />,
    roles: ["ROLE_COMPANYHR"], 
  },
  {
    path: "/ROLE_COMPANYHR/profile-settings",
    element: <ProfileSettings />,
    roles: ["ROLE_COMPANYHR"], 
  },
  {
    path: "/ROLE_COMPANYHR/manage-student-cv",
    element: <ManageCvPage />,
    roles: ["ROLE_COMPANYHR"], 
  },

  {
    path: "/ROLE_COMPANYHR/applied-students/:internshipId",
    element: <ViewAppliedStudents />,
    roles: ["ROLE_COMPANYHR"], 
  },
];

export default COMPANYHRRoutes;
