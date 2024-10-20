import React, { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col, Pagination } from 'react-bootstrap';
import axios from 'axios';
import styles from './InterviewList.module.scss';  

const StudentInterviews = ({ studentId }) => {
  const [interviews, setInterviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [interviewsPerPage] = useState(5);

  useEffect(() => {
    // Fetch interviews by student ID
    axios.get(/api/v1/interviews/getInterviewById/${studentId})
      .then(response => {
        setInterviews(response.data);
      })
      .catch(error => {
        console.error('Error fetching interviews', error);
      });
  }, [studentId]);

  // Get current interviews for pagination
  const indexOfLastInterview = currentPage * interviewsPerPage;
  const indexOfFirstInterview = indexOfLastInterview - interviewsPerPage;
  const currentInterviews = interviews.slice(indexOfFirstInterview, indexOfLastInterview);

  // Pagination
  const totalPages = Math.ceil(interviews.length / interviewsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className={styles.interviewListContainer}>
      <h2 className={styles.title}>Your Interviews</h2>
      <Row>
        {currentInterviews.map(interview => (
          <Col key={interview.interviewId} md={12} lg={6} className="mb-4">
            <Card className={styles.interviewCard}>
              <Card.Img variant="top" src={data:image/png;base64,${interview.companyLogo}} className={styles.interviewImage} />
              <Card.Body>
                <Card.Title>{interview.title}</Card.Title>
                <Card.Text>
                  <strong>Company:</strong> {interview.companyName}
                  <br />
                  <strong>Date:</strong> {new Date(interview.date).toLocaleDateString()}
                  <br />
                  <strong>Time:</strong> {interview.time}
                  <br />
                  <strong>Description:</strong> {interview.description}
                </Card.Text>
                <Button variant="primary" href={interview.meetingLink} target="_blank">
                  Join Interview
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      
      {/* Pagination */}
      <Pagination className="justify-content-center">
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </Container>
  );
};

export default StudentInterviews;