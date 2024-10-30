// src/components/HRApplications.js
import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom"; 
import styles from "./ViewAppliedStudents.module.scss"; 
import Layout from "../../Layout/Layout";

const ViewAppliedStudents = () => {
  const { internshipId } = useParams(); 
  const [applications, setApplications] = useState([]);

  useEffect(() => {
  
    fetch(`/api/v1/applications/internship/${internshipId}`)
      .then((response) => response.json())
      .then((data) => setApplications(data))
      .catch((error) => console.error("Error fetching applications:", error));
  }, [internshipId]);

  const handleDownloadCv = (studentId) => {
    fetch(`/api/v1/application/cv/download?studentId=${studentId}`)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `student_${studentId}_CV.pdf`;
        a.click();
      })
      .catch((error) => console.error("Error downloading CV:", error));
  };

  return (
    <Layout>
    <Container className={styles.applicationContainer}>
      <h2>Applied Students</h2>
      <Row>
        {applications.map((application) => (
          <Col md={6} key={application.applicationId}>
            <Card className={styles.applicationCard}>
            <Card.Body>
                  <Card.Title>Student ID: {application.studentId}</Card.Title>
                  <Card.Text>
                    <strong>Application ID:</strong> {application.applicationId} <br />
                    <strong>Status:</strong> {application.status} <br />
                    <strong>Applied Date:</strong> {new Date(application.appliedDate).toLocaleDateString()} <br />
                    <strong>Interview ID:</strong> {application.interviewId || "N/A"} <br />
                    <strong>Practice Session ID:</strong> {application.practiceSessionId || "N/A"} <br />
                  </Card.Text>
                  <Button
                    variant="success"
                    onClick={() => handleDownloadCv(application.studentId)}
                  >
                    Download CV
                  </Button>
                </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
    </Layout>
  );
};

export default ViewAppliedStudents;
