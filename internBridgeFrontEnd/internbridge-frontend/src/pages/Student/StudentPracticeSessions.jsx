import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col, Pagination } from 'react-bootstrap';
import axios from 'axios';
import styles from './StudentPracticeSession.module.scss';
import Layout from '../../Layout/Layout';
import sessionImg from '../../assets/imgs/practiceSessionimg.png';
const StudentPracticeSessionPage = () => {
  const [practiceSessions, setPracticeSessions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const sessionsPerPage = 5;

  useEffect(() => {
    // Fetch practice sessions from the backend
    const fetchSessions = async () => {
      try {
        const response = await axios.get('/api/v1/practice-sessions');
        setPracticeSessions(response.data);
      } catch (error) {
        console.error('Error fetching practice sessions:', error);
      }
    };

    fetchSessions();
  }, []);

  // Pagination logic
  const indexOfLastSession = currentPage * sessionsPerPage;
  const indexOfFirstSession = indexOfLastSession - sessionsPerPage;
  const currentSessions = practiceSessions.slice(indexOfFirstSession, indexOfLastSession);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
  <Layout>

    <h2 className={`${styles.title}`} style={{ textAlign: 'left' }}>Your Practice Sessions</h2>
    <Container className={styles.practiceSessionContainer}>
      <Row className="justify-content-center">
        {currentSessions.map((session) => (
          <Col key={session.id} md={6} lg={4} className="mb-4">
            <Card className={styles.practiceCard}>
              <Card.Img variant="top" src={sessionImg} alt="Practice Session" />
              <Card.Body>
                <Card.Title>{session.title}</Card.Title>
                <Card.Text>
                  <strong>Description: </strong>{session.description}
                  <br />
                  <strong>Date: </strong>{session.startDate}
                  <br />
                  <strong>Time: </strong>{session.startTime}
                  <br />
                  <strong>Status: </strong>{session.status}
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => window.open(session.meetingLink, '_blank')}
                >
                  Join Session
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      
      <Row className="justify-content-center">
        <Pagination>
          {Array.from({ length: Math.ceil(practiceSessions.length / sessionsPerPage) }, (_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Row>
    </Container>
   </Layout>
  );
};

export default StudentPracticeSessionPage;