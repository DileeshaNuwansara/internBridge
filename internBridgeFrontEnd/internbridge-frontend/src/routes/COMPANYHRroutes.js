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
    path: "/companyhr/dashboard",
    element: <CompanyhrDashboard />,
    roles: ["ROLE_COMPANY_HR"], 
  },
  {
    path: "/companyhr/internship-details",
    element: <InternshipDetails />,
    roles: ["ROLE_COMPANY_HR"], 
  },
  {
    path: "/companyhr/interview-details",
    element: <InterviewDetails />,
    roles: ["ROLE_COMPANY_HR"], 
  },
  {
    path: "/companyhr/manage-practice-sessions",
    element: <ManagePracticeSessions />,
    roles: ["ROLE_COMPANY_HR"], 
  },
  {
    path: "/companyhr/active-interns-status",
    element: <ActiveInternsStatus />,
    roles: ["ROLE_COMPANY_HR"], 
  },
  {
    path: "/companyhr/profile-settings",
    element: <ProfileSettings />,
    roles: ["ROLE_COMPANY_HR"], 
  },
  {
    path: "/companyhr/manage-student-cv",
    element: <ManageCvPage />,
    roles: ["ROLE_COMPANY_HR"], 
  },

  {
    path: "/companyhr/applied-students:internshipId",
    element: <ViewAppliedStudents />,
    roles: ["ROLE_COMPANY_HR"], 
  },
];

export default COMPANYHRRoutes;
