import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'; 
//import AppNavbar from '../../components/AppNavBar/AppNavBar';
//import AppSidebar from '../../components/AppSideBar/AppSideBar';
import styles from './dashboard.module.scss';
import Cards from '../../components/Card/Cards';
import Layout from '../../Layout/Layout';
const StudentDashboard = () => {
  const role = 'ROLE_STUDENT';

  return (

    <Layout role={role}>

  
      <Container fluid className={styles.dashboardContent}> 
        <Row> 
        <Col xs={12} md={6} lg={4} className="mb-4"> 
            <Cards title="Internship Details" description="View internship details" link={`/${role}/student-new-internships`} />

          </Col>
          
          <Col xs={12} md={6} lg={4} className="mb-4"> 
            <Cards title="Interviews" description="View upcoming interviews" link="/ROLE_STUDENT/student-interviews" />

          </Col>
          <Col xs={12} md={6} lg={4} className="mb-4">
            <Cards title="Practice Sessions" description="Participate in practice sessions" link="/ROLE_STUDENT/student-practice-sessions" />
          </Col>
          <Col xs={12} md={6} lg={4} className="mb-4">
            <Cards title="Manage CV" description="Upload and manage your CV" link="/ROLE_STUDENT/manage-cv" />

          </Col>
          
	        <Col xs={12} md={6} lg={4} className="mb-4"> 
            <Cards title="Profile Settings" description=" Student Profile Settings" link="/ROLE_STUDENT/profile-settings"  />
          </Col>

        </Row>
      </Container>
      </Layout>
);
};

export default StudentDashboard;
