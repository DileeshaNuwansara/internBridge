
import React, { useState, useEffect } from 'react';
import Layout from '../../Layout/Layout';
import Profile from '../../components/Profile/Profile';
import { Card, Button, Row, Col } from 'react-bootstrap';
import { CgProfile } from "react-icons/cg";
import { useNavigate } from 'react-router-dom';
import styles from './StudentProfileSettings.module.scss'; 

const StudentProfileSettings = ({  role ='ROLE_STUDENT' }) => {
  const [showProfile, setShowProfile] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem('userId')); 
  const navigate = useNavigate();

  
  useEffect(() => {
    localStorage.setItem('userId', userId);
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      console.log(userId);
    } else {
      console.error("User ID not found in localStorage.");
    }
  }, [userId]);

  const handleOpenProfile = () => {
    if (userId) {
      setShowProfile(true);
    } else {
      alert("User ID is missing. Please log in again."); // Notify user if userId is missing
    }
  };

  const handleCloseProfile = () => setShowProfile(false);

  return (
    <Layout role={role}>
      <h2 className={styles.title}>Student Profile Settings</h2>
      
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
                onClick={() => navigate('/ROLE_STUDENT/manage-cv')}
              >
                <CgProfile className="me-2" />
                Go to CV Management
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {showProfile && userId && (
        <Profile
          show={showProfile}
          handleClose={handleCloseProfile}
          userId={userId}
          role={role} 
          
        />
      )}
    </Layout>
  );
};

export default StudentProfileSettings;
