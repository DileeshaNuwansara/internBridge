import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './AppNavBar.module.scss';
 

const AppNavBar = ({ role='student', notifications }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  console.log(role);

 //toggle  button
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode', !isDarkMode);   };

 //notification mark
  const hasNotifications = notifications && notifications.length > 0;

  return (
    <div className={styles.AppNavBar}>
    <Navbar
     expand="lg"  className={`${styles.AppNavBar} glass-navbar ${isDarkMode ? 'navbar-dark' : 'navbar-light'} bg-transparent `}>
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center me-4">
          <img
            src="./assets/image.png"
            alt="InternBridge Logo"
            style={{ width: '140px', height: '60px' }}
            className={`${styles['navbar-brand']} d-inline-block align-top me-3`}
          />
         
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to={`/${role}/dashboard`}>Dashboard</Nav.Link>

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
              <Nav.Link as={Link} to="/student/manage-new-internships">Internships</Nav.Link>
                
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
          <Nav.Link as={Link} to="/notifications" className={`position-relative ${hasNotifications ? styles['notify-dot'] : ''}`}>
              <i className="bi bi-bell"></i>
            </Nav.Link>

            <Nav.Link as={Button} onClick={toggleTheme} className={styles['theme-toggle']}>
              {isDarkMode ? <i className="bi bi-brightness-high"></i> : <i className="bi bi-moon"></i>}
            </Nav.Link>


              <NavDropdown title={role.charAt(0).toUpperCase() + role.slice(1)} id="user-dropdown">
              <NavDropdown.Item as={Link} to={`/${role}/profile-settings`}>Profile</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/logout">Sign Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </div>
  );
};

export default AppNavBar;
