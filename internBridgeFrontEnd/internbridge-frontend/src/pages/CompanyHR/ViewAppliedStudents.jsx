// src/components/HRApplications.js
import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios"; 
import styles from "./ViewAppliedStudents.module.scss"; 
import Layout from "../../Layout/Layout";

const ViewAppliedStudents = () => {
  const { internshipId } = useParams(); 
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8081/api/v1/applications/internship/${internshipId}`)
      .then((response) => setApplications(response.data))
      .catch((error) => console.error("Error fetching applications:", error));
  }, [internshipId]);

  const handleDownloadCv = (studentId) => {
    axios
      .get(`http://localhost:8081/api/v1/application/cv/download?studentId=${studentId}`, {
        responseType: "blob",
      })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `student_${studentId}_CV.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        alert('Student Cv download is successfull.');
      })
      .catch((error) => console.error("Error downloading CV:", error));
       alert('Student Cv download is unsuccessfull.');
  };

  return (
    <Layout>
      <h2>Currently Applied Applicants</h2>
    <Container className={styles.applicationContainer}>
      
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
