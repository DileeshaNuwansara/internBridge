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
            <Nav.Link as={Link} to={`/${role}/dashboard`}>{role} Dashboard</Nav.Link>

            {role === 'ROLE_ADMIN' && (
              <NavDropdown title="Manage Users" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/admin/add-admin">Manage Admins</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/admin/add-student">Manage Students</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/admin/add-coordinator">Manage Coordinators</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/admin/add-companyhr">Manage Company-HRs</NavDropdown.Item>
                
                {/* <NavDropdown.Item as={Link} to="/users/student/cvs">Students' CVs</NavDropdown.Item> */}
              </NavDropdown>
            )}

            {role === 'ROLE_STUDENT' && (
              <>
              <Nav.Link as={Link} to="/student/profile-settings">Profile</Nav.Link>
              <Nav.Link as={Link} to="/student/manage-cv">Students' CVs</Nav.Link>
              <Nav.Link as={Link} to="/student/student-new-internships">Internships</Nav.Link>
                
              </>
            )}

            {role === 'ROLE_COORDINATOR' && (
              <>
                <Nav.Link as={Link} to="/coordinator/manage-new-internships">Internships</Nav.Link>
                <Nav.Link as={Link} to="/coordinator/mange-interviews">Interviews</Nav.Link>
                <Nav.Link as={Link} to="/coordinator/manage-practice-sessions">Practice Sessions</Nav.Link>
                <Nav.Link as={Link} to="/coordinator/manage-student-applications">Students' CVs</Nav.Link>
              </>
            )}
            {role === 'ROLE_COMPANYHR' && (
              <>
                <Nav.Link as={Link} to="/companyhr/active-interns-status">Active Hired Interns</Nav.Link>
                <Nav.Link as={Link} to="/companyhr/interview-details">Interviews</Nav.Link>
                <Nav.Link as={Link} to="/companyhr/manage-practice-sessions">Practice Sessions</Nav.Link>
                <Nav.Link as={Link} to="/companyhr/manage-cv">Students' CVs</Nav.Link>
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


              <NavDropdown title={role.charAt(0).toUpperCase() + role.slice(1)} id="user-dropdown">
              <NavDropdown.Item as={Link} to={`/${role}/profile-settings`}>Profile</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/signout">Sign Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
};

export default AppNavBar;
