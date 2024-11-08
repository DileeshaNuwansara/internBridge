import React, { useState,useEffect } from 'react';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './AppNavBar.module.scss';
import { MdDarkMode,MdOutlineDarkMode } from "react-icons/md";
import { MdNotificationAdd } from "react-icons/md";

import img from '../../assets/imgs/internbridge_logo.png'

const AppNavBar = ( ) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hasNotifications, setHasNotifications] = useState(false);
  const role = localStorage.getItem('role');
  console.log(role);

 //toggle  button
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode', !isDarkMode);   };

    useEffect(() => {
      
      const fetchNotifications = async () => {
         
          // const notifications = await new Promise((resolve) =>
          //     setTimeout(() => resolve(true), 1000) 
          // );
          //setHasNotifications(notifications);
      };

      fetchNotifications();
  }, []);;

  return (
    <div className={styles.AppNavBar}>
    <Navbar
     expand="lg"
     className={`${styles.navbar} glass-navbar ${isDarkMode ? 'navbar-dark' : 'navbar-light'}`}>
      
      <Container>
        {/* <Navbar.Brand as={Link} to="/" className="d-flex align-items-center me-4">
          <img
            src={img}
            alt="InternBridge Logo"
            style={{ width: '140px', height: '60px' }}
            className={`${styles['navbar-brand']} d-inline-block align-top me-3`}
          />
         
        </Navbar.Brand> */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={`/${role}/dashboard`} className={styles.navLink}>{role} Dashboard</Nav.Link>

            {role === 'ROLE_ADMIN' && (
              <>
               
              <NavDropdown title="Manage Users" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/ROLE_ADMIN/add-company"className={styles.navLinkdown}>Manage New Companies</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/ROLE_ADMIN/add-admin"className={styles.navLinkdown}>Manage Admins</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/ROLE_ADMIN/add-student"className={styles.navLinkdown}>Manage Students</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/ROLE_ADMIN/add-coordinator"className={styles.navLinkdown}>Manage Coordinators</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/ROLE_ADMIN/add-companyhr"className={styles.navLinkdown}>Manage Company-HRs</NavDropdown.Item>
                
                {/* <NavDropdown.Item as={Link} to="/users/student/cvs">Students' CVs</NavDropdown.Item> */}
              </NavDropdown>

              <Nav.Link as={Link} to="/ROLE_ADMIN/add-company" className={styles.navLink}>Register new Sponsors</Nav.Link>

              </>
              
            )}

            {role === 'ROLE_STUDENT' && (
              <>
              {/* <Nav.Link as={Link} to="/student/profile-settings">Profile</Nav.Link> */}
              <Nav.Link as={Link} to="/ROLE_STUDENT/manage-cv"className={styles.navLink}>Students' CVs</Nav.Link>
              <Nav.Link as={Link} to="/ROLE_STUDENT/student-new-internships"className={styles.navLink}>Internships</Nav.Link>
                
              </>
            )}

            {role === 'ROLE_COORDINATOR' && (
              <>
                <Nav.Link as={Link} to="/ROLE_COORDINATOR/manage-new-companyies"className={styles.navLink}>New Companies</Nav.Link>
                <Nav.Link as={Link} to="/ROLE_COORDINATOR/manage-new-internships"className={styles.navLink}>Internships</Nav.Link>
                <Nav.Link as={Link} to="/ROLE_COORDINATOR/manage-interviews"className={styles.navLink}>Interviews</Nav.Link>
                <Nav.Link as={Link} to="/ROLE_COORDINATOR/manage-practice-sessions"className={styles.navLink}>Practice Sessions</Nav.Link>
                {/* <Nav.Link as={Link} to="/ROLE_COORDINATOR/manage-student-applications" className={styles.navLink}>Students' CVs</Nav.Link> */}
              </>
            )}
            {role === 'ROLE_COMPANYHR' && (
              <>
                <Nav.Link as={Link} to="/ROLE_COMPANYHR/active-interns-status"className={styles.navLink}>Active Hired Interns</Nav.Link>
                <Nav.Link as={Link} to="/ROLE_COMPANYHR/interview-details"className={styles.navLink}>Interviews</Nav.Link>
                <Nav.Link as={Link} to="/ROLE_COMPANYHR/manage-practice-sessions"className={styles.navLink}>Practice Sessions</Nav.Link>
                <Nav.Link as={Link} to="/ROLE_COMPANYHR/manage-cv" className={styles.navLink}>Manage Applications</Nav.Link>
              </>
            )}
          </Nav>

          <Nav>
          <Nav.Link as={Link} to="#" className={`position-relative ${hasNotifications ? styles['notify-dot'] : ''}`}>
            <MdNotificationAdd />
          </Nav.Link>

            <Nav.Link as={Button} onClick={toggleTheme} className={styles['theme-toggle']}>
              {isDarkMode ? <MdOutlineDarkMode /> : <MdDarkMode/> }
            </Nav.Link>


              <NavDropdown title={role.charAt(0).toUpperCase() + role.slice(1) } id="user-dropdown" >
              <NavDropdown.Item as={Link} to={`/${role}/profile-settings` } className={styles.navLinkdown} >Profile</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/signout" className={styles.navLinkdown} >Sign Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
};

export default AppNavBar;
