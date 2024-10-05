import React from 'react';
import { Container } from 'react-bootstrap';
import AppNavbar from '../AppNavBar/AppNavBar';
import AppSidebar from '../AppSideBar/AppSideBar';
import styles from './Layout.module.scss';


const Layout = ({ children ,role }) => {
    return (
      <div className={styles.layoutWrapper}>
        <AppNavbar role={role} />
        <Container fluid className="d-flex">
          <AppSidebar role={role} className={styles.sidebar} />
          <main className={styles.mainContent}>
          {children}
          </main>
      </Container>
    </div>
  );
};

export default Layout;