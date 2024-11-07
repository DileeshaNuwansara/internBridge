import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'; 
//import AppNavbar from '../../components/AppNavBar/AppNavBar';
//import AppSidebar from '../../components/AppSideBar/AppSideBar';
import styles from './dashboard.module.scss';
import Cards from '../../components/Card/Cards';
import Layout from '../../Layout/Layout';
const CompanyhrDashboard = () => {
  const role = 'companyhr';

  return (

    <Layout role={role}>

  
      <Container fluid className={styles.dashboardContent}> 
        <Row> 
          <Col xs={12} md={6} lg={4} className="mb-4"> 
            <Cards title="Internship Details" description="Manage internship details" link="/ROLE_COMPANYHR/internship-details" />

          </Col>
          <Col xs={12} md={6} lg={4} className="mb-4">
            <Cards title="Interview Details" description="Review interview details" link="/ROLE_COMPANYHR/interview-details" />

          </Col>
          <Col xs={12} md={6} lg={4} className="mb-4">
            <Cards title="Practice Sessions" description="practice sessions" link="/ROLE_COMPANYHR/manage-practice-sessions" />

          </Col>
          <Col xs={12} md={6} lg={4} className="mb-4"> 
            <Cards title="Applied Students for Internship" description="Manage Student & internship details" link="/ROLE_COMPANYHR/manage-student-cv" />

          </Col>

          <Col xs={12} md={6} lg={4} className="mb-4"> 
            <Cards title="Active Interns" description="Track intern progress" link="/ROLE_COMPANYHR/active-interns-status" />

          </Col>
	        <Col xs={12} md={6} lg={4} className="mb-4"> 
            <Cards title="Profile Settings" description=" Student Profile Settings" link="/ROLE_COMPANYHR/profile-settings"  />
          </Col>

        </Row>
      </Container>
      </Layout>
);
};

export default CompanyhrDashboard;
