import React, { useState } from 'react';
import Layout from  '../../Layout/Layout';
import Profile from '../../components/Profile/Profile';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import styles from './StudentProfileSettings.module.scss'; 
const StudentProfileSettings = ({ role }) => {
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const handleOpenProfile = () => setShowProfile(true);
  const handleCloseProfile = () => setShowProfile(false);

  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  return (
    <Layout role={role}>
      <h1 className={styles.title}>Student Profile Settings</h1>

      
      <Row className="justify-content-center mt-4">
        <Col xs={12} sm={8} md={6}>
          <Card className={styles.profileCard}>
            <Card.Body className="text-center">
              <Card.Title>Your {role} Profile Settings</Card.Title>
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


      <Row className="justify-content-center mt-4">
        <Col xs={12} sm={8} md={6}>
          <Card className={styles.profileCard}>
            <Card.Body className="text-center">
              <Card.Title>Manage Your CV</Card.Title>
              <Card.Text>Click the button below to manage your CV or upload a new one.</Card.Text>
              <Button
                variant="secondary"
                className={`d-flex align-items-center justify-content-center ${styles.profileButton}`}
                onClick={() => navigate('/manage-cv')}
              >
                <CgProfile className="me-2" />
                Go to CV Management
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

     
      {showProfile && (
        <Profile
          role={role}
          token={token}
          show={showProfile}
          userId={userId}
          handleClose={handleCloseProfile}
        />
      )}
    </Layout>
  );
};

export default StudentProfileSettings;