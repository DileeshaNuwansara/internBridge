import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../Layout/Layout";
import { Container } from "react-bootstrap";
import styles from "./AppliedInternships.module.scss";

function AppliedInternships() {
  const [internships, setInternships] = useState([]);
  const studentId = localStorage.getItem("userId"); 

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/v1/student/${studentId}/internships`);
        setInternships(response.data);
      } catch (error) {
        console.error("Error fetching internships:", error);
        alert("Failed to fetch internships.");
      }
    };

    fetchInternships();
  }, [studentId]);

  return (
    <Layout>
        <Container>
        <div className={styles.appliedInternships}>
      <h2 className={styles.header}>Applied Internships</h2>
      {internships.length > 0 ? (
        <div className={styles.internshipCards}>
          {internships.map((internship) => (
            <div key={internship.internshipId} className={styles.card}>
              <div className={styles.cardHeader}>
                <h3>{internship.title}</h3>
                <p className={styles.company}>{internship.company}</p>
              </div>
              <div className={styles.cardBody}>
                <p>
                  <strong>Description:</strong> {internship.description}
                </p>
                <p>
                  <strong>Requirements:</strong> {internship.requirements}
                </p>
                <p>
                  <strong>Position:</strong> {internship.position}
                </p>
                <p>
                  <strong>Start Date:</strong> {internship.startDate}
                </p>
                <p>
                  <strong>Available Positions:</strong> {internship.availablePositions}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.noInternships}>You haven't applied to any internships yet.</p>
      )}
    </div>
    </Container>
    </Layout>
  );
}

export default AppliedInternships;
