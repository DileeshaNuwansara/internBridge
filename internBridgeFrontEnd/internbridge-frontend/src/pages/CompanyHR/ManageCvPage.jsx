import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import styles from "./ViewAppliedStudents.module.scss"; 
import Layout from "../../Layout/Layout";
const ManageCvPage = () => {

  const [internships, setInternships] = useState([]);
  const navigate = useNavigate(); 
  const companyHrId = localStorage.getItem('userId');



  useEffect(() => {
    
    fetch(`/api/v1/internships/companyHr/${companyHrId}`)
      .then((response) => response.json())
      .then((data) => setInternships(data))
      .catch((error) => console.error("Error fetching internships:", error));
  }, [companyHrId]);

  const handleViewApplications = (internshipId) => {
   
    navigate(`/companyhr/applied-students/${internshipId}`);
  };


  return (
    <Layout>
     <h2>Student Applications</h2>
    <Container className={styles.internshipContainer}>
      
      <Row>
        {internships.map((internship) => (
          <Col md={4} key={internship.internshipId}>
            <Card className={styles.internshipCard}>
              <Card.Img variant="top" src={internship.imageUrl} />
              <Card.Body>
                <Card.Title>{internship.title}</Card.Title>
                <Card.Text>
                  {internship.description}
                </Card.Text>
                <Button
                  variant="primary"
                  onClick={() => handleViewApplications(internship.internshipId)}
                >
                  View Applied Students
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

export default ManageCvPage
