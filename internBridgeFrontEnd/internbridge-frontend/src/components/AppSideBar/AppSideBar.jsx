import { Link } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
import { useState,useEffect} from 'react';
import logo from '../../assets/imgs/internbridge_logo.png';
import smallLogo from '../../assets/imgs/smallLogo.png';
import styles from './AppSideBar.module.scss';  // Import the SCSS module
import { MdOutlineSettings,MdDashboard } from "react-icons/md";
import { FaUsersLine } from "react-icons/fa6";
import { FaUserPlus,FaUserCog,FaFile,FaCalendarAlt,FaCalendarCheck } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";

const AppSideBar = () => {
  const [role, setRole] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
   
    const fetchRole = async () => {
      try {
        const storedRole = localStorage.getItem('role');
        
        if (storedRole) {
          setRole(storedRole);
        } else {
          const backendRole = await fetchRoleFromBackend();

          setRole(backendRole);
        }
      } catch (error) {
        console.error('Error fetching role:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchRole();
  }, []);



  console.log("User role:", role);
  const fetchRoleFromBackend = async () => {
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('ROLE_STUDENT'); 
      }, 1000); 
    });
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };


  const menuItems = {
    ROLE_ADMIN: [
      { label: 'Dashboard', icon: <MdDashboard size={20}/>, path: '/ROLE_ADMIN/dashboard' },
      { label: 'Admins',icon: <FaUsersLine size={20}/>, path: '/ROLE_ADMIN/add-Admin' },
      { label: 'Students',icon: <FaUsersLine size={20}/>, path: '/ROLE_ADMIN/add-student' },
      { label: 'Still Applicants', icon: <FaUsersLine size={20} />, path: '/ROLE_ADMIN/not-hired-students' },
      { label: 'Company HRs',icon: <FaUsersLine size={20}/>, path: '/ROLE_ADMIN/add-Company HRs' },
      { label: 'Coordinators',icon: <FaUsersLine size={20}/>, path: '/ROLE_ADMIN/add-Coordinators' },
      // {
      //   label: 'Users', icon: <FaUsersLine size={20}/>,
      //   submenu: [
      //     { label: 'Students', path: 'ROLE_ADMIN/add-student' },
      //     { label: 'Admins', path: 'ROLE_ADMIN/add-admin' },
      //     { label: 'Company HRs', path: 'ROLE_ADMIN/add-companyhr' },
      //     { label: 'Coordinators', path: 'ROLE_ADMIN/add-coordinator' },
      //   ]
      // },
      { label: 'My Profile', icon: <  FaUserPlus size={25} />, path: '/ROLE_ADMIN/profile-settings' },
      { label: 'App Settings', icon: <MdOutlineSettings size={20}/>, path: '/ROLE_ADMIN/app-settings' },
      
    ],
    ROLE_STUDENT: [
      { label: 'Dashboard', icon: <MdDashboard size={20}/>, path: '/ROLE_STUDENT/dashboard' },
      { label: 'Internships', icon: <FaFile size={20}/>, path: '/ROLE_STUDENT/student-new-internships' },
      { label: 'Interviews', icon: <FaCalendarAlt size={20}/>, path: '/ROLE_STUDENT/student-interviews' },
      { label: 'Practice Sessions', icon: <FaCalendarCheck size={20} />, path: '/ROLE_STUDENT/student-practice-sessions' },
      { label: 'Profile', icon: < FaUserPlus size={20}/>, path: '/ROLE_STUDENT/profile-settings' },
    ],
    ROLE_COORDINATOR: [
      { label: 'Dashboard', icon: <MdDashboard size={20}/>, path: '/ROLE_COORDINATOR/dashboard' },
      { label: 'Internships', icon: <FaFile size={20}/>, path: '/ROLE_COORDINATOR/manage-new-internships' },
      { label: 'Interviews', icon: <FaCalendarCheck size={20}/>, path: '/ROLE_COORDINATOR/manage-interviews' },
      { label: 'Practice Sessions', icon: <FaCalendarCheck size={20}/>, path: '/ROLE_COORDINATOR/manage-practice-sessions' },
      { label: 'CV', icon: <FaFile size={20}/>, path: '/ROLE_COORDINATOR/manage-student-applications' },
      { label: 'Hired Applicants', icon: <FaUserCog size={20} />, path: '/ROLE_COORDINATOR/hired-students' },
      { label: 'Still Applicants', icon: <FaUsersLine size={20} />, path: '/ROLE_COORDINATOR/not-hired-students' },
      { label: 'New Connections', icon: < FaUsersGear size={20} />, path: '/ROLE_COORDINATOR/manage-new-companyies' },
      { label: 'Profile', icon: < FaUserPlus size={20} />, path: '/ROLE_COORDINATOR/profile-settings' },

    ],
    ROLE_COMPANYHR: [
      { label: 'Dashboard', icon: <MdDashboard size={20}/>, path: '/ROLE_COMPANYHR/dashboard' },
      { label: 'Internships', icon: <FaCalendarCheck size={20}/>, path: '/ROLE_COMPANYHR/internship-details' },
      { label: 'Interviews', icon: <FaCalendarCheck size={20}/>, path: '/ROLE_COMPANYHR/interview-details' },
      { label: 'Practice Sessions', icon: <FaCalendarCheck size={20}/>, path: '/ROLE_COMPANYHR/manage-practice-sessions' },
      { label: 'Applications', icon: <FaFile size={20}/>, path: '/ROLE_COMPANYHR/manage-cv' },
      { label: 'Active Interns', icon: <FaUserCog size={20} />, path: '/ROLE_COMPANYHR/active-interns-status' },
      { label: 'Profile', icon: < FaUserPlus size={20} />, path: '/ROLE_COMPANYHR/profile-settings' },
    ],
  };

  if (loading) {
    return <p>Loading...</p>;
  }


  if (!role) {
    return <p>Error: No role found. Please sign in again.</p>;
  }

  const items = menuItems[role];

  if (!items) {
    return <p>No menu available for this role.</p>; 
  }
  

  const renderMenuItem = ({ label, icon, path, submenu }) => (
    <li key={path} className={styles.navItem}>
      {submenu ? (
        <div className={styles.dropdownMenu}>
          <Link to={path} className={`nav-link dropdown-toggle ${styles.navLink}`} data-bs-toggle="dropdown">
          <span className={styles.ii}>{icon} </span>
         {sidebarOpen && <span className={styles.label}>{label}</span>}
          </Link>
          <ul className={styles.dropdownMenu} >
            {submenu.map((subItem) => (
              <li key={subItem.path}>
                <Link to={subItem.path} className={styles.dropdownItem1}> {sidebarOpen && <span>{subItem.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Link to={path} className={`nav-link ${styles.navLink}`}>
         <span className={styles.ii}>{icon} </span>
         {sidebarOpen && <span className={styles.label}>{label}</span>}
        </Link>
      )}
    </li>
  );



  return (

  

    <nav className={`${styles.sidebar} ${sidebarOpen ? styles.open: styles.closed} nav flex-column`}>


      <div className={styles.logoContainer} onClick={toggleSidebar}>
        <img
           src={sidebarOpen ? logo : smallLogo}
          alt="InternBridge Logo"
          className={sidebarOpen ? styles.logo : styles.smallLogo}

        />
      </div>

      <div className={`${styles.nav1} nav flex-column `}>
        {menuItems[role].map(renderMenuItem)}
      </div>

      <div className="mt-auto">
        <Link to="/signout" className={styles.logout}>
          <CiLogout className={styles.icon} size={20} /> 
          {sidebarOpen && <span className={styles.lolabel}>Sign Out</span>}
        </Link>
      </div>
    </nav>
  );
};

export default AppSideBar;
