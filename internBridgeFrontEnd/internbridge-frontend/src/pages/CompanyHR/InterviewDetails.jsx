import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Container, Modal, Form } from 'react-bootstrap';
import styles from './InterviewDetails.module.css'; // Import module CSS
import axios from 'axios';

const InterviewDetails = () => {

  const companyHrId = localStorage.getItem('userId'); 

  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    status: '',
    startDate: '',
    startTime: '',
    meetingLink: '',
    studentId: '',
    coordinatorId: '',
    companyHrId: companyHrId,
  });

  
  const [selectedInterviewId, setSelectedInterviewId] = useState(null);

  useEffect(() => {
    const companyHrId = localStorage.getItem('companyHrId');
    setFormData(prevFormData => ({
      ...prevFormData,
      companyHrId: companyHrId,
    }));
  }, []);

  const fetchInterviews = async () => {
    try {
      const response = await axios.get('/api/v1/interviews/getAll');
      setInterviews(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching interviews:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const createInterview = async () => {
    try {
      await axios.post('/api/v1/interviews/create', formData);
      setShowCreateModal(false);
      fetchInterviews(); 
    } catch (error) {
      console.error('Error creating interview:', error);
    }
  };

  const updateInterview = async () => {
    try {
      await axios.put(`/api/v1/interviews/update/${selectedInterviewId}`, formData);
      setShowUpdateModal(false);
      fetchInterviews(); 
    } catch (error) {
      console.error('Error updating interview:', error);
    }
  };

  const openUpdateModal = (interview) => {
    setSelectedInterviewId(interview.interviewId);
    setFormData({
      description: interview.description,
      status: interview.status,
      startDate: interview.startDate,
      startTime: interview.startTime,
      meetingLink: interview.meetingLink,
      studentId: interview.studentId,
      coordinatorId: interview.coordinatorId,
      companyHrId: localStorage.getItem('userId'),
    });
    setShowUpdateModal(true);
  };

  const deleteInterview = async (id) => {
    try {
      await axios.delete(`/api/v1/interviews/delete/${id}`);
      setInterviews(interviews.filter((interview) => interview.interviewId !== id));
    } catch (error) {
      console.error('Error deleting interview:', error);
    }
  };

  if (loading) return <p>Loading interviews...</p>;

  return (
    <Container>
      <div className={styles.header}>
        <h2>Manage Interviews</h2>
        <Button className={styles.createButton} onClick={() => setShowCreateModal(true)}>
          Create New Interview
        </Button>
      </div>
      <Row>
        {interviews.map((interview) => (
          <Col key={interview.interviewId} md={4} sm={12} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{interview.description}</Card.Title>
                <Card.Text>Status: {interview.status}</Card.Text>
                <Card.Text>Start Date: {interview.startDate}</Card.Text>
                <Card.Text>Start Time: {interview.startTime}</Card.Text>
                <Card.Text>Meeting Link: {interview.meetingLink}</Card.Text>
                <Button variant="primary" onClick={() => openUpdateModal(interview)}>
                  Update
                </Button>{' '}
                <Button variant="danger" onClick={() => deleteInterview(interview.interviewId)}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      
      <Modal show={showCreateModal} onHide={() => setShowCreateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Interview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formStartDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formStartTime">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formMeetingLink">
              <Form.Label>Meeting Link</Form.Label>
              <Form.Control
                type="text"
                name="meetingLink"
                value={formData.meetingLink}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formStudentId">
              <Form.Label>Student ID</Form.Label>
              <Form.Control
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formCoordinatorId">
              <Form.Label>Coordinator ID</Form.Label>
              <Form.Control
                type="text"
                name="coordinatorId"
                value={formData.coordinatorId}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={createInterview}>
            Create Interview
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Update Interview Modal */}
      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Interview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formStartDate">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formStartTime">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formMeetingLink">
              <Form.Label>Meeting Link</Form.Label>
              <Form.Control
                type="text"
                name="meetingLink"
                value={formData.meetingLink}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formStudentId">
              <Form.Label>Student ID</Form.Label>
              <Form.Control
                type="text"
                name="studentId"
                value={formData.studentId}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formCoordinatorId">
              <Form.Label>Coordinator ID</Form.Label>
              <Form.Control
                type="text"
                name="coordinatorId"
                value={formData.coordinatorId}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={updateInterview}>
            Update Interview
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default InterviewDetails;
