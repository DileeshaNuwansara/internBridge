import React, { useState } from 'react';
import Layout from '../../Layout/Layout';
import Profile from '../../components/Profile/Profile';
import { CgProfile } from "react-icons/cg";
import { Card, Button, Row, Col } from 'react-bootstrap';
import styles from './CompanyhrProfileSettings.module.scss';

const CompanyHRProfileSettings = () => {
  const [showProfile, setShowProfile] = useState(false);

  const handleOpenProfile = () => setShowProfile(true);
  const handleCloseProfile = () => setShowProfile(false);

  //const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const userId = localStorage.getItem('userId');
  console.log("storage user id ",userId);

  return (
    <Layout role={role}>
      <h2>Company HR Profile Settings</h2>
      <Row className="justify-content-center mt-4">
    
        <Col xs={12} sm={8} md={6}>
          <Card className={styles.profileCard}>
            <Card.Body className="text-center">
              <Card.Title>Your Profile Settings</Card.Title>
              <Card.Text>Click the button below to view and edit your profile settings.</Card.Text>

              
              <Button
                
                className={`d-flex align-items-center justify-content-center ${styles.profileButton}`}
                onClick={handleOpenProfile}
              >
                <CgProfile className="me-2" />
                Open Profile Settings
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Profile role={role} userId={userId} show={showProfile} handleClose={handleCloseProfile} />
    </Layout>
  );
};

export default CompanyHRProfileSettings;
