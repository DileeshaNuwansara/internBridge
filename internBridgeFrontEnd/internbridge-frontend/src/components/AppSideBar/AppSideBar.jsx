import { Link } from 'react-router-dom';
import { CiLogout } from "react-icons/ci";
import { useState } from 'react';
import logo from '../../assets/imgs/internbridge_logo.png';
import smallLogo from '../../assets/imgs/smallLogo.png';
import styles from './AppSideBar.module.scss';  // Import the SCSS module
import { MdOutlineSettings,MdDashboard } from "react-icons/md";
import { FaUsersLine } from "react-icons/fa6";
import { FaUserPlus,FaUserCog,FaFile,FaCalendarAlt,FaCalendarCheck } from "react-icons/fa";


const AppSideBar = ({ role = 'ROLE_ADMIN' }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const menuItems = {
    ROLE_ADMIN: [
      { label: 'Dashboard', icon: <MdDashboard size={25}/>, path: '/admin/dashboard' },
      {
        label: 'Users', icon: <FaUsersLine size={25}/>, path: '/admin/users',
        submenu: [
          { label: 'Students', path: '/admin/add-students' },
          { label: 'Admins', path: '/admin/add-admins' },
          { label: 'Company HRs', path: '/admin/add-companyhrs' },
          { label: 'Coordinators', path: '/admin/add-coordinators' },
        ]
      },
      { label: 'Settings', icon: <MdOutlineSettings size={25}/>, path: '/admin/profile-settings' },
      // { label: 'Profile', icon: < RiAdminFill size={25} />, path: '/admin/profile-settings' },
    ],
    ROLE_STUDENT: [
      { label: 'Dashboard', icon: <MdDashboard size={25}/>, path: '/student/dashboard' },
      { label: 'Interviews', icon: <FaCalendarAlt size={25}/>, path: '/student/interviews' },
      { label: 'Practice Sessions', icon: <FaCalendarCheck size={25} />, path: '/student/practicesessions' },
      { label: 'Profile', icon: < FaUserPlus size={25}/>, path: '/student/profile-settings' },
    ],
    ROLE_COORDINATOR: [
      { label: 'Dashboard', icon: <MdDashboard size={25}/>, path: '/users/coordinator/dashboard' },
      { label: 'Interviews', icon: <FaCalendarCheck size={25}/>, path: '/users/coordinator/interviews' },
      { label: 'Practice Sessions', icon: <FaCalendarCheck size={25}/>, path: '/users/coordinator/practicesessions' },
      { label: 'CV', icon: <FaFile size={25}/>, path: '/users/student/cvs' },
      { label: 'Applicants', icon: <FaUserCog size={25} />, path: '/users/admin/users/students' },
      { label: 'Profile', icon: < FaUserPlus size={25} />, path: '/users/coordinator/profile-settings' },
    ],
    ROLE_COMPANYHR: [
      { label: 'Dashboard', icon: <MdDashboard size={25}/>, path: '/companyhr/dashboard' },
      { label: 'Interviews', icon: <FaCalendarCheck size={25}/>, path: '/companyhr/interviews' },
      { label: 'Practice Sessions', icon: <FaCalendarCheck size={25}/>, path: '/companyhr/practicesessions' },
      { label: 'CV', icon: <FaFile size={25}/>, path: '/companyhr/cvs' },
      { label: 'Applicants', icon: <FaUserCog size={25} />, path: '/companyhr/students' },
      { label: 'Profile', icon: < FaUserPlus size={25} />, path: '/companyhr/profile-settings' },
    ],
  };

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
                <Link to={subItem.path} className={styles.dropdownItem}> {sidebarOpen && <span>{subItem.label}</span>}
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

      <div className={`${styles.nav} nav flex-column `}>
        {menuItems[role].map(renderMenuItem)}
      </div>

      <div className="mt-auto">
        <Link to="/logout" className={styles.logout}>
          <CiLogout className={styles.icon} size={25} /> 
          {sidebarOpen && <span className={styles.lolabel}>Logout</span>}
        </Link>
      </div>
    </nav>
  );
};

export default AppSideBar;
