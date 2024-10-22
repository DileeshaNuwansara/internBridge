import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Modal, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import styles from './PracticeSessionPage.module.scss'; 
import Layout from '../../Layout/Layout';
import sessionImg from '../../assets/imgs/practiceSessionimg.png';

const ManagePracticeSessions = () => {
  const [practiceSessions, setPracticeSessions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentSession, setCurrentSession] = useState({
    title: '',
    description: '',
    startDate: '',
    startTime: '',
    status: '',
    meetingLink: '',
  });

  const userRole = localStorage.getItem('role');
  const companyHrId = localStorage.getItem('userId');

  
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get(`/api/v1/practice-sessions/${companyHrId}`);
        setPracticeSessions(response.data);
      } catch (error) {
        console.error('Error fetching practice sessions:', error);
      }
    };
    fetchSessions();
  }, [companyHrId]);

  
  const handleInputChange = (e) => {
    setCurrentSession({ ...currentSession, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentSession.id) {
        
        await axios.put(`/api/v1/practice-sessions/${currentSession.id}`, currentSession);
      } else {
        
        await axios.post(`/api/v1/practice-sessions`, currentSession);
      }
      setShowModal(false);
      setCurrentSession({
        title: '',
        description: '',
        startDate: '',
        startTime: '',
        status: '',
        meetingLink: '',
      });
     
      const response = await axios.get(`/api/v1/practice-sessions/${companyHrId}`);
      setPracticeSessions(response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/v1/practice-sessions/${id}`);
      setPracticeSessions(practiceSessions.filter((session) => session.id !== id));
    } catch (error) {
      console.error('Error deleting session:', error);
    }
  };


  const handleShowModal = (session = {}) => {
    setCurrentSession(session);
    setShowModal(true);
  };

  return (
    <Layout role ={userRole}>
    <Container>
      <Row className="mb-4">
        <Col className="text-end">
          <Button onClick={() => handleShowModal()} variant="primary">
            Create Practice Session
          </Button>
        </Col>
      </Row>

      <Row>
        {practiceSessions.map((session) => (
          <Col key={session.id} md={6} lg={4} className="mb-4">
            <Card className={styles.sessionCard}>
            <Card.Img variant="top" src={sessionImg} alt="Practice Session" />
              <Card.Body>
                <Card.Title>{session.title}</Card.Title>
                <Card.Text>
                  <strong>Description:</strong> {session.description}
                </Card.Text>
                <Card.Text>
                  <strong>Date:</strong> {session.startDate}
                </Card.Text>
                <Card.Text>
                  <strong>Time:</strong> {session.startTime}
                </Card.Text>
                <Card.Text>
                  <strong>Status:</strong> {session.status}
                </Card.Text>
                <Card.Text>
                  <strong>Meeting Link:</strong> <a href={session.meetingLink}>{session.meetingLink}</a>
                </Card.Text>
                <Button variant="warning" onClick={() => handleShowModal(session)} className="me-2">
                  Update
                </Button>
                <Button variant="danger" onClick={() => handleDelete(session.id)}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for Creating/Updating Sessions */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentSession.id ? 'Update Practice Session' : 'Create Practice Session'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title" className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={currentSession.title}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="description" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                rows={3}
                value={currentSession.description}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="startDate" className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={currentSession.startDate}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="startTime" className="mb-3">
              <Form.Label>Start Time</Form.Label>
              <Form.Control
                type="time"
                name="startTime"
                value={currentSession.startTime}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="status" className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Control
                type="text"
                name="status"
                value={currentSession.status}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="meetingLink" className="mb-3">
              <Form.Label>Meeting Link</Form.Label>
              <Form.Control
                type="url"
                name="meetingLink"
                value={currentSession.meetingLink}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {currentSession.id ? 'Update' : 'Create'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
    </Layout>
  );
};




export default ManagePracticeSessions;
