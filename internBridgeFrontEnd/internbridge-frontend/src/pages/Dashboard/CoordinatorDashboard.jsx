import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'; 
//import AppNavbar from '../../components/AppNavBar/AppNavBar';
//import AppSidebar from '../../components/AppSideBar/AppSideBar';
import styles from './dashboard.module.scss';
import Cards from '../../components/Card/Cards';
import Layout from '../../Layout/Layout';
const CoordinatorDashboard = () => {

  const role = localStorage.getItem('role');
  const userId = localStorage.getItem('userId');

  return (

    <Layout role={role}>

  
      <Container fluid className={styles.dashboardContent}> 
        <Row> 
         
          <Col xs={12} md={6} lg={4}  className="mb-4"> 
            <Cards title="New Practice Sessions"  description="Oversee practice sessions" link={`/${role}/manage-practice-sessions`}  />

          </Col>
          <Col xs={12} md={6} lg={4}  className="mb-4">
            <Cards title="Manage Interviews" description="Oversee interview processes" link={`/${role}/manage-interviews`} />

          </Col>
          <Col xs={12} md={6} lg={4}  className="mb-4">
            <Cards title="New Internships" description="View new internships" link={`/${role}/manage-new-internships`} />

          </Col>
          <Col xs={12} md={6} lg={4}  className="mb-4">
            <Cards title="New Companies" description="View new Companies connect with internBridge" link={`/${role}/manage-new-companyies`} />

          </Col>
          <Col xs={12} md={6} lg={4}  className="mb-4">
            <Cards title="Hired Applicants" description="Alredy got an internship and now close ongoing processings with this CVs. " link= {`/${role}/hired-students`}/>

          </Col>
          <Col xs={12} md={6} lg={4}  className="mb-4">
            <Cards title="Not Comfirmed Applicats" description="Still processing CVs List." link={`/${role}/not-hired-students`} />

          </Col>
          <Col xs={12} md={6} lg={4}  className="mb-4">
            <Cards title="Manage Student Applications" description="Review student applications" link={`/${role}/manage-student-applications`} />

          </Col>
          <Col xs={12} md={6} lg={4}  className="mb-4">
            <Cards title="Manage Company HR" description="Review Company HR details" link= "/ROLE_ADMIN/add-companyhr" />
	        </Col>
            <Col xs={12} md={6} lg={4}  className="mb-4">
            <Cards title="Profile Settings" description=" Coordinator Profile Settings" link={`/${role}/profile-settings`} />
          </Col>

        </Row>
      </Container>
      </Layout>
);
};

export default CoordinatorDashboard;
