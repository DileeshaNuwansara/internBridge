import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, Container, Modal, Form } from 'react-bootstrap';
import styles from './InterviewDetails.module.scss'; 
import axios from 'axios';

const InterviewDetails = () => {
  const companyHrId = localStorage.getItem('userId'); 

  const [internshipId, setInternshipId] = useState('');
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    status: 'Scheduled',
    startDate: '',
    startTime: '',
    meetingLink: '',
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
    fetchInterviews();
  }, []);

  useEffect(() => {
    if (internshipId) fetchAppliedStudents(internshipId);
  }, [internshipId]);

  const fetchAppliedStudents = async (internshipId) => {
    const response = await axios.get(`/api/v1/applications/internship/${internshipId}`);
    setStudents(response.data);
  };

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
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const interviewRequest = {
        ...formData,
        studentIds: selectedStudents,
      };
      await axios.post('/api/v1/interviews/create', interviewRequest);
      resetForm();
      fetchInterviews();
    } catch (error) {
      console.error('Error creating interview:', error);
    }
  };

  const updateInterview = async () => {
    try {
      const interviewRequest = {
        ...formData,
        studentIds: selectedStudents, // Assuming the selected students can also be updated
      };
      await axios.put(`/api/v1/interviews/update/${selectedInterviewId}`, interviewRequest);
      resetForm();
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
      coordinatorId: interview.coordinatorId,
      companyHrId: companyHrId,
    });
    setSelectedStudents(interview.studentIds); // Set selected students for the update
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

  const toggleStudentSelection = (studentId) => {
    setSelectedStudents(prev =>
      prev.includes(studentId) ? prev.filter(id => id !== studentId) : [...prev, studentId]
    );
  };

  const resetForm = () => {
    setFormData({
      description: '',
      status: 'Scheduled',
      startDate: '',
      startTime: '',
      meetingLink: '',
    
      companyhrId: companyHrId,
    });
    setSelectedStudents([]);
    setShowCreateModal(false);
    setShowUpdateModal(false);
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

      <Modal show={showCreateModal} onHide={resetForm}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Interview</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
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
              <Form.Label>Select Students</Form.Label>
              <div>
                {students.map(student => (
                  <div key={student.studentId}>
                    <Form.Check
                      type="checkbox"
                      label={`${student.name} - ${student.email}`}
                      checked={selectedStudents.includes(student.studentId)}
                      onChange={() => toggleStudentSelection(student.studentId)}
                    />
                  </div>
                ))}
              </div>
            </Form.Group>
            <Form.Group controlId="formCompanyhrid">
              <Form.Label>Company HR ID</Form.Label>
              <Form.Control
                type="text"
                name="companyhrId"
                value={formData.companyhrId}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={resetForm}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Create Interview
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showUpdateModal} onHide={resetForm}>
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
              <Form.Label>Select Students</Form.Label>
              <div>
                {students.map(student => (
                  <div key={student.studentId}>
                    <Form.Check
                      type="checkbox"
                      label={`${student.name} - ${student.email}`}
                      checked={selectedStudents.includes(student.studentId)}
                      onChange={() => toggleStudentSelection(student.studentId)}
                    />
                  </div>
                ))}
              </div>
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={resetForm}>
                Cancel
              </Button>
              <Button variant="primary" onClick={updateInterview}>
                Update Interview
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default InterviewDetails;
