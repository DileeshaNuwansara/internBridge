import CompanyhrDashboard from '../pages/Dashboard/CompanyhrDashboard';
import InternshipDetails from '../pages/CompanyHR/InternshipDetails';
import InterviewDetails from '../pages/CompanyHR/InterviewDetails';
import ManagePracticeSessions from '../pages/CompanyHR/ManagePracticeSessions';
import ActiveInternsStatus from '../pages/CompanyHR/ActiveInternsStatus';
import ProfileSettings from '../pages/CompanyHR/ProfileSettings';
import ManageCv from '../pages/CompanyHR/ManageCv';

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
    path: "/companyhr/manage-cv",
    element: <ManageCv />,
    roles: ["ROLE_COMPANY_HR"], 
  },
];

export default COMPANYHRRoutes;