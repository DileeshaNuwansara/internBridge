import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Pagination } from "react-bootstrap";
import axios from "axios";
import styles from "./CoordinatorManagePracticeSessions.module.scss";
import session_image_url from '../src/assets/imgs/practiceSessionimg.png';
import Layout from "../../Layout/Layout";


const ManagePracticeSessions = () => {
  const [practiceSessions, setPracticeSessions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
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

  const handleUpdate = (sessionId) => {
    
    console.log("Update clicked for session:", sessionId);
  };

  const handleDelete = (sessionId) => {
    
    axios.delete(`http://localhost:8081/api/v1/practice-sessions/${sessionId}`)
      .then(() => {
        setPracticeSessions(prevSessions => prevSessions.filter(session => session.id !== sessionId));
      })
      .catch(error => {
        console.error("Error deleting practice session", error);
      });
  };

  // Pagination logic
  const totalPages = Math.ceil(practiceSessions.length / itemsPerPage);
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const displayedSessions = practiceSessions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <Layout>
    <div className={styles.coordinatorManagePracticeSessions}>
      <h2>Manage Practice Sessions</h2>
      <Row>
        {displayedSessions.map(session => (
          <Col key={session.id} sm={12} md={6} lg={4}>
            <Card className={styles.sessionCard}>
              <Card.Img variant="top" src={session_image_url} alt="Practice Session" />
              <Card.Body>
                <Card.Title>{session.title}</Card.Title>
                <Card.Text>
                  <strong>Status:</strong> {session.status}
                </Card.Text>
                <Card.Text>{session.description}</Card.Text>
		            <Card.Text>{session.startDate}</Card.Text>
		            <Card.Text>{session.startTime}</Card.Text>
                <Button variant="primary" onClick={() => handleUpdate(session.id)}>
                  Update
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
    </Layout>
  );
};

export default ManagePracticeSessions;