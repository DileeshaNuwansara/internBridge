
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './AppSideBar.module.scss';

import './AppSideBar.module.scss';

const AppSideBar = ({role}) =>{

  const menuItems ={
    admin:[
      {label:'Dashboard', icon: 'bi-speedometer2', path: '/admin/dashboard'},
      {label:'Users', icon: 'bi-people', path: '/admin/users',
      submenu: [
        { label: 'Students', path: '/admin/users/students' },
        { label: 'Admins', path: '/admin/users/admins' },
        { label: 'Company HRs', path: '/admin/users/companyhrs' },
        { label: 'Coordinators', path: '/admin/users/coordinators' },
      ]
    },
      
      {label:'Settings', icon: 'bi-gear', path: '/admin/settings'},
    ],
    student:[
      {label:'Dashboard', icon: 'bi-speedometer2', path: '/users/student/dashboard'},
      //{label:'Internships', icon: '', path: '/students/internships'},
      {label:'Interviews', icon: 'bi-calendar-check', path: '/users/student/interviews'},
      {label:'Practice Sessions', icon: 'bi-journal', path: '/users/student/practicesessions'},
      {label:'Profile', icon: 'bi-person-circle', path: '/users/student/profile'},
    ],
    coordinator:[
      {label:'Dashboard', icon: 'bi-speedometer2', path: '/users/coordinator/dashboard'},
      //{label:'Internships', icon: '', path: '/coordinator/internships'},
      {label:'Interviews', icon: 'bi-calendar-check', path: '/users/coordinator/interviews'},
      {label:'Practice Sessions', icon: 'bi-journal', path: '/users/coordinator/practicesessions'},
      {label: 'CV', icon:'bi-file-earmark-person', path: '/users/student/cvs'},
      {label: 'Applicants', icon: 'bi-person-lines-fill', path: '/users/admin/users/students' },
      {label:'Profile', icon: 'bi-person-circle', path: '/users/coordinator/profile'},
    ],
  };

  const renderMenuItem = ({ label, icon, path, submenu }) => {
    if (submenu) {
      return (
        <NavDropdown title={label} id="users-dropdown">
          {submenu.map(item => (
            <NavDropdown.Item key={item.path} as={Link} to={item.path}>
              {item.label}
            </NavDropdown.Item>
          ))}
        </NavDropdown>
      );
    }

    return (
      <Nav.Item key={path}>
      <Nav.Link as={Link} to={path}>
          <i className={`bi ${icon}`}></i> &nbsp;{label}
        </Nav.Link>
      </Nav.Item>
    );
  };




  return (
    <Navbar bg="dark" variant="dark" expand="lg" className={styles.AppSideBar}>
      <Navbar.Brand>InternBridge</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {menuItems[role].map(renderMenuItem)}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppSideBar;

