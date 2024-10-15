import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal, Button, Spinner, Alert,Form } from 'react-bootstrap';
import styles from './profile.module.scss';

const Profile = ({ show, handleClose, userId }) => {
  const [userData, setUserData] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [updatedProfile, setUpdatedProfile] = useState(null);

  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const email = localStorage.getItem('email');


  useEffect(() => {
    if (!token || !role || !userId) {
      setError('User is not authenticated or role/userId is missing.');
      setLoading(false);
      return;
    }

    if (!role) return;


    setLoading(true);

    let apiEndpoint = '/api/v1/profile';

    if (role === 'ROLE_ADMIN') {
      apiEndpoint = '/api/v1/admin/profile/'; //  endpoint for Admins
    } else if (role === 'ROLE_STUDENT') {
      apiEndpoint = `/api/v1/student/${userId}`; //  endpoint for Students
    } else if (role === 'ROLE_COMPANY_HR') {
      apiEndpoint = '/api/v1/companyhr/profile'; //  for CompanyHR
    } else if (role === 'ROLE_COORDINATOR') {
      apiEndpoint = '/api/v1/coordinator/profile'; //  for Coordinators
    }

    axios
    .get(apiEndpoint, {
        params: { email },
        headers: { Authorization: `Bearer ${token}` } // Include token if needed
      })
    .then((response) => {
      setUserData(response.data);
      
        
        
        if (role === 'ROLE_STUDENT') {
          axios.get(`/api/v1/student/details/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            setStudentData(res.data);
          })
          .catch((err) => {
            setError('Failed to fetch student-specific data.');
          });
        }
        setLoading(false);
      })
      .catch((error) => {
        setError('Failed to fetch profile data.');
        setLoading(false);
      });
    }, [token, role, userId,email]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    if (role !== 'ROLE_STUDENT') return;
    setLoading(true);
    
  
    axios.put(`/api/v1/student/update/${userId}`, updatedProfile, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })

    .then(response => {
      setUserData(response.data);
      setLoading(false);
      handleClose();
    })
    .catch(error => {
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
          <Form.Control type="email" value={userData.email} readOnly />
        </Form.Group>
        <Form.Group>
          <Form.Label><strong>password:</strong></Form.Label>
          <Form.Label> {userData.password} </Form.Label>
        </Form.Group>
        <Form.Group>
          <Form.Label>Comppany</Form.Label>
          <Form.Control type="text" value={userData.company} readOnly />
        </Form.Group>
        <Form.Group>
          <Form.Label>Phone</Form.Label>
          <Form.Control type="text" value={userData.phone} readOnly />
        </Form.Group>
        <Form.Group>
          <Form.Label><strong>Role :</strong></Form.Label>
          <Form.Label >{userData.email} readOnly </Form.Label>
        </Form.Group>


			  <p><strong>Your status up to now :</strong> {userData.status} </p>



              {/* If the role is Student, display additional student details */}
              {role === "ROLE_STUDENT" && studentData && (
                <>
                  <h5>Student Specific Information</h5>
                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                     <Form.Control type="email" value={userData.email} readOnly />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>SC Number</Form.Label>
                    <Form.Control
                        type="text"
                        name="scNumber"
                        value={updatedProfile?.scNumber || userData.scNumber}
                        onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>GPA</Form.Label>
                    <Form.Control
                        type="number"
                        step="0.01"
                        name="gpa"
                        value={updatedProfile?.gpa || userData.gpa}
                        onChange={handleInputChange}
                    />
                  </Form.Group>
                  <Form.Group>
                        <Form.Label>Applied Position</Form.Label>
                        <Form.Control
                            type="text"
                            name="position"
                            value={updatedProfile?.position || userData.position}
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
		      </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
