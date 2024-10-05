import React from 'react';
import { Container, Row, Col } from 'react-bootstrap'; 
//import AppNavbar from '../../components/AppNavBar/AppNavBar';
//import AppSidebar from '../../components/AppSideBar/AppSideBar';
import styles from './dashboard.module.scss';
import Cards from '../../components/Card/Cards';
import Layout from '../../components/Layout/Layout';
const AdminDashboard = () => {
  const role = 'admin';

  return (

    <Layout role={role}>

  
      <Container fluid className={styles.dashboardContent}> 
        <Row> 
          <Col xs={12} md={6} lg={4}> 
            <Cards title="Manage Students" description="Manage student details" link="/manage-students"  />
          </Col>
          <Col xs={12} md={6} lg={4}>
            <Cards title="Manage Coordinators" description="Manage coordinators " link="/manage-coordinators"  />
          </Col>
          <Col xs={12} md={6} lg={4}>
            <Cards title="Manage Admins" description="Manage administrative access" link="/manage-admins"  />
          </Col>
          <Col xs={12} md={6} lg={4}>
            <Cards title="Manage Company HR" description="Oversee company HR activities" link="/manage-company-hr"  />
          </Col>
	        <Col xs={12} md={6} lg={4}>
            <Cards title="Profile Settings" description=" Admin Profile Settings" link="/manage-admin"  />
          </Col>

        </Row>
      </Container>
      </Layout>
);
};

export default AdminDashboard;
