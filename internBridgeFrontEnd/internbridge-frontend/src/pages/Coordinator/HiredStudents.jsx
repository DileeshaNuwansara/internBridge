import React, { useEffect, useState } from "react";
import { Card, Button, Modal, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

const HiredStudents = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [interviews, setInterviews] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Fetch hired students
  useEffect(() => {
    fetchHiredStudents();
  }, []);

  const fetchHiredStudents = async () => {
    try {
      const response = await axios.get("/api/students/hired"); // API for hired students
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching hired students:", error);
    }
  };

  const fetchInterviews = async (studentId) => {
    try {
      const response = await axios.get('http://localhost:8081/api/interviews/${studentId}');
      setInterviews(response.data);
    } catch (error) {
      console.error("Error fetching interviews:", error);
    }
  };

  const handleShowModal = (student) => {
    setSelectedStudent(student);
    fetchInterviews(student.id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStudent(null);
    setInterviews([]);
  };

  return (
    <Container className="mt-4">
      <Row>
        {students.map((student) => (
          <Col key={student.id} sm={12} md={6} lg={4} className="mb-4">
            <Card className="shadow-lg" style={{ borderRadius: "10px" }}>
              <Card.Body>
                <Card.Title>{student.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{student.email}</Card.Subtitle>
                <Card.Text>
                  <strong>Phone:</strong> {student.phone}
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => handleShowModal(student)}
                >
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {selectedStudent && (
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>{selectedStudent.name}'s Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h5>Contact Information</h5>
            <p><strong>Email:</strong> {selectedStudent.email}</p>
            <p><strong>Phone:</strong> {selectedStudent.phone}</p>
            <hr />
            <h5>CV</h5>
            <p>
              {selectedStudent.cv ? (
                <a href={selectedStudent.cv} target="_blank" rel="noopener noreferrer">// cv link danna........
                  View CV
                </a>
              ) : (
                "CV not available"
              )}
            </p>
            <hr />
            <h5>Interview Details</h5>
            {interviews.length > 0 ? (
              interviews.map((interview) => (
                <div key={interview.id} className="mb-2">
                  <p><strong>Date:</strong> {new Date(interview.interviewStartDate).toLocaleDateString()}</p>
                  <p><strong>Start Time:</strong> {interview.startTime}</p>
                  <p><strong>Status:</strong> {interview.status}</p>
                  <hr />
                </div>
              ))
            ) : (
              <p>No interviews scheduled for this student.</p>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default HiredStudents;