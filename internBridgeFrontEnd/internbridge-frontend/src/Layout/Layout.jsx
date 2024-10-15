import React, {useState} from 'react';
import { Container } from 'react-bootstrap';
import AppNavbar from '../components/AppNavBar/AppNavBar';
import AppSidebar from '../components/AppSideBar/AppSideBar';
import styles from "./Layout.module.scss";


const Layout = ({ children ,role }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
      setIsSidebarVisible(!isSidebarVisible);
  };

    return (
      <div className={styles.layoutWrapper}>

      <AppNavbar role={role} toggleSidebar={toggleSidebar} />

        <Container fluid className="d-flex">

        <div className={`d-${isSidebarVisible ? 'block' : 'none'} d-md-block ${styles.sidebar}`}>
            <AppSidebar role={role} />
        </div>
          
        <main className={`${styles.mainContent} flex-grow-1`}>
            {children}
          </main>

      </Container>
    </div>
  );
};

export default Layout;