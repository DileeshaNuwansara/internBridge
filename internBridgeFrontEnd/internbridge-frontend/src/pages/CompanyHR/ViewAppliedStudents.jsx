// src/components/HRApplications.js
import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom"; // Import useParams to get internshipId
import styles from "./ViewAppliedStudents.module.css"; // Unique styling
import Layout from "../../Layout/Layout";

const ViewAppliedStudents = () => {
  const { internshipId } = useParams(); // Get internshipId from URL
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Fetch applications for the specific internship
    fetch(`/api/v1/applications/internship/${internshipId}`)
      .then((response) => response.json())
      .then((data) => setApplications(data))
      .catch((error) => console.error("Error fetching applications:", error));
  }, [internshipId]);

  const handleDownloadCv = (studentId) => {
    fetch(`/api/v1/applications/downloadCv/${studentId}`)
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
                <Card.Title>{application.student.name}</Card.Title>
                <Card.Text>
                  GPA: {application.student.gpa} <br />
                  Position: {application.student.position} <br />
                  Status: {application.status}
                </Card.Text>
                <Button
                  variant="success"
                  onClick={() => handleDownloadCv(application.student.userId)}
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
