import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Pagination, Modal,Form } from "react-bootstrap";
import axios from "axios";
import styles from "./CoordinatorManageInternships.module.scss";
import sessionImg from '../../assets/imgs/practiceSessionimg.png';
import Layout from "../../Layout/Layout";


const ManagePracticeSessions = () => {
  const [practiceSessions, setPracticeSessions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false); 
  const [selectedSession, setSelectedSession] = useState(null);
  const [newSession, setNewSession] = useState({
    title: "",
    description: "",
    startDate: "",
    startTime: "",
    status: "",
    meetingLink: "",
    companyHr: "" 
  });
  const itemsPerPage = 5;

  useEffect(() => {
    
    axios.get("http://localhost:8081/api/v1/practice-sessions")
      .then(response => {
        setPracticeSessions(response.data);

      })
      .catch(error => {
        console.error("Error fetching practice sessions", error);
      });
  }, []);

  const handleCreateClick = () => setShowCreateModal(true);
  const handleCreateModalClose = () => setShowCreateModal(false);

  const handleNewSessionChange = (e) => {
    const { name, value } = e.target;
    setNewSession(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateSession = () => {
    axios.post("http://localhost:8081/api/v1/practice-sessions/create", newSession)
      .then(response => {
        setPracticeSessions(prevSessions => [...prevSessions, response.data]);
        setShowCreateModal(false);
        setNewSession({
          title: "",
          description: "",
          startDate: "",
          startTime: "",
          status: "",
          meetingLink: "",
          companyHr: ""
        });
      })
      .catch(error => {
        console.error("Error creating practice session", error);
        alert('Error creating practice session');
      });
  };



  const handleDelete = (sessionId) => {
    
    axios.delete(`http://localhost:8081/api/v1/practice-sessions/${sessionId}`)
      .then(() => {
        setPracticeSessions(prevSessions => prevSessions.filter(session => session.id !== sessionId));
      })
      .catch(error => {
        console.error("Error deleting practice session", error);
        alert('Error deleting practice session');
      });
  };

  const handleViewSession = (session) => {
    setSelectedSession(session);
    setShowModal(true);
  };

  const handleViewModalClose = () => {
    setShowModal(false);
    setSelectedSession(null);
  };

  // Pagination logic
  const totalPages = Math.ceil(practiceSessions.length / itemsPerPage);
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const displayedSessions = practiceSessions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <Layout>
    <div className={styles.coordinatorManagePracticeSessions}>
      <h2>Manage Practice Sessions</h2>
      <Button variant="success" onClick={handleCreateClick} className="mb-3">
          Create Practice Session
        </Button>
      <Row>
        {displayedSessions.map(session => (
          <Col key={session.id} sm={12} md={6} lg={4}>
            <Card className={styles.sessionCard}>
              <Card.Img variant="top" src={sessionImg} alt="Practice Session" />
              <Card.Body>
                <Card.Title>{session.title}</Card.Title>
                <Card.Text>
                  <strong>Status:</strong> {session.status}
                </Card.Text>
                <Card.Text>{session.description}</Card.Text>
                <hr/><br/>
		            <Card.Text>{session.startDate}</Card.Text>
		            <Card.Text>{session.startTime}</Card.Text>
                
                <Button variant="success" onClick={() => handleViewSession(session)}>
                    View
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(session.id)} className="ml-2">
                    Delete
                  </Button>
              </Card.Body>
            </Card> 
          </Col>
        ))}
      </Row>

      <Pagination>
        {[...Array(totalPages)].map((_, idx) => (
          <Pagination.Item key={idx + 1} active={idx + 1 === currentPage} onClick={() => handlePageChange(idx + 1)}>
            {idx + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
    <br/>
    <Modal show={showModal} onHide={handleViewModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Practice Session Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedSession && (
            <div>
              <p><strong>Title:</strong> {selectedSession.title}</p>
              <p><strong>Description:</strong> {selectedSession.description}</p>
              <p><strong>Status:</strong> {selectedSession.status}</p>
              <p><strong>Start Date:</strong> {selectedSession.startDate}</p>
              <p><strong>Start Time:</strong> {selectedSession.startTime}</p>
              <p><strong>Meeting Link:</strong> <a href={selectedSession.meetingLink} target="_blank" rel="noopener noreferrer">{selectedSession.meetingLink}</a></p>
              <p><strong>Company HR:</strong> {selectedSession.companyHr}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleViewModalClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <br/>
    <Modal show={showCreateModal} onHide={handleCreateModalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Practice Session</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={newSession.title}
                  onChange={handleNewSessionChange}
                />
              </Form.Group>
              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="description"
                  value={newSession.description}
                  onChange={handleNewSessionChange}
                />
              </Form.Group>
              
              <Form.Group controlId="startDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  name="startDate"
                  value={newSession.startDate}
                  onChange={handleNewSessionChange}
                />
              </Form.Group>
              <Form.Group controlId="startTime">
                <Form.Label>Start Time</Form.Label>
                <Form.Control
                  type="time"
                  name="startTime"
                  value={newSession.startTime}
                  onChange={handleNewSessionChange}
                />
              </Form.Group>
              <Form.Group controlId="meetingLink">
                <Form.Label>Meeting Link</Form.Label>
                <Form.Control
                  type="url"
                  name="meetingLink"
                  value={newSession.meetingLink}
                  onChange={handleNewSessionChange}
                />
              </Form.Group>
              <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={newSession.status}
                onChange={handleNewSessionChange}
              >
                <option value="">Select Status</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Pending">Pending</option>
                <option value="Canceled">Canceled</option>
                <option value="Postponed">Postponed</option>
              </Form.Select>
           </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCreateModalClose}>
              Close
            </Button>
            {/* <Button variant="info" onClick={handleCreateSession}>
              Create Session
            </Button> */}
          </Modal.Footer>
        </Modal>
    </Layout>
  );
};

export default ManagePracticeSessions;