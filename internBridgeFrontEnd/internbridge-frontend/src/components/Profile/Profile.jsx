import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal, Button, Spinner, Alert, Form } from 'react-bootstrap';
import styles from './profile.module.scss';

const Profile = ({ show, handleClose, userId, role }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatedProfile, setUpdatedProfile] = useState(null);

  useEffect(() => {
    if (!role || !userId) {
      setError('User role/userId is missing.');
      setLoading(false);
      return;
    }

    setLoading(true);
    let apiEndpoint = '';

    if (role === 'ROLE_ADMIN' || role === 'ROLE_COMPANYHR' || role === 'ROLE_COORDINATOR') {
      apiEndpoint = `http://localhost:8081/api/v1/user/getUserById/${userId}`; // endpoint for Admin, Company HR, and Coordinator
    } else if (role === 'ROLE_STUDENT') {
      apiEndpoint = `http://localhost:8081/api/v1/student/details/${userId}`; // endpoint for Students
    }

    axios.get(apiEndpoint)
      .then((response) => {
        setUserData(response.data);
        setUpdatedProfile(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching profile data:', error);
        setError('Failed to fetch profile data.');
        setLoading(false);
      });
  }, [role, userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile({ ...updatedProfile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    let updateEndpoint;

    if (role === 'ROLE_STUDENT') {
      updateEndpoint = `http://localhost:8081/api/v1/student/update/${userId}`; // endpoint for updating student
    } else {
      updateEndpoint = `http://localhost:8081/api/v1/user/updateUser/${userId}`; // endpoint for updating other users
    }
    alert('updatted profile informations.');

    axios.put(updateEndpoint, updatedProfile)
      .then(response => {
        setUserData(response.data);
        setLoading(false);
        handleClose();
      })
      .catch(error => {
        console.error('Error updating profile data:', error);
        setError('Failed to update profile data.');
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" variant="primary" />
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="text-center">
        {error}
      </Alert>
    );
  }

  return (
    <div>
      <Modal show={show} onHide={handleClose} centered className="mt-5">
        <Modal.Header closeButton className={styles.modalHeader}>
          <Modal.Title>Profile Information</Modal.Title>
        </Modal.Header>

        <Modal.Body className={styles.modalBody}>
          <p><strong>Username:</strong> {userData.name}</p>
          <p><strong>Your Role:</strong> {userData.role}</p>

          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={updatedProfile.email}
                onChange={handleInputChange}
              />
            </Form.Group>
            {/* <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={updatedProfile.password}
                onChange={handleInputChange}
              />
            </Form.Group> */}
            <Form.Group>
              <Form.Label>Company</Form.Label>
              <Form.Control
                type="text"
                name="company"
                value={updatedProfile.company}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={updatedProfile.phone}
                onChange={handleInputChange}
              />
            </Form.Group>
            <p><strong>Your status up to now:</strong> {userData.status}</p>

            {role === "ROLE_STUDENT" && (
              <>
                <h5>Student Specific Information</h5>
                <Form.Group>
                  <Form.Label>SC Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="scNumber"
                    value={updatedProfile.scNumber}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>GPA</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    name="gpa"
                    value={updatedProfile.gpa}
                    onChange={handleInputChange}
                  />
                </Form.Group>
              </>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className={styles.closeButton} onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" className={styles.saveButton} onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
