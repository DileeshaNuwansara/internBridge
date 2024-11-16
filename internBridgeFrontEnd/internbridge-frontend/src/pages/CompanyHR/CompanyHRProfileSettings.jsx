import React, { useState, useEffect} from 'react';
import Layout from '../../Layout/Layout';
import Profile from '../../components/Profile/Profile';
import { CgProfile } from "react-icons/cg";
import { Card, Alert, Button, Row, Col } from 'react-bootstrap';
import styles from './CompanyhrProfileSettings.module.scss';

const CompanyHRProfileSettings = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [userId, setUserId] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    
    const storedUserId = localStorage.getItem('userId');
    const storedRole = localStorage.getItem('role');
    
    setUserId(storedUserId);
    setRole(storedRole);
  }, []);

  const handleOpenProfile = () => setShowProfile(true);
  const handleCloseProfile = () => setShowProfile(false);

  console.log("storage user id ",userId);

  if (!userId || !role) {
    return (
      <Alert variant="danger" className="text-center mt-4">
        User data is missing. Please log in again.
      </Alert>
    );
  }

  return (
    <Layout role={role} userId={userId}>
       <h2>Company HR Profile Settings</h2>

      <Row className="justify-content-center align-items-center mt-4">
     
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


      <Profile role={role} userId={userId} show={showProfile} handleClose={handleCloseProfile} />
    </Layout>
);
};

export default CompanyHRProfileSettings;
