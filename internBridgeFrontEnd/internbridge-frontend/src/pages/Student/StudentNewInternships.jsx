import React, { useEffect, useState } from 'react';
import { Card, Button, Pagination } from 'react-bootstrap';
import axios from 'axios';
import styles from './StudentNewInternships.module.scss';
import Layout from '../../Layout/Layout';


const StudentNewInternships = () => {
  const [internships, setInternships] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const internshipsPerPage = 5;

  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    
    const fetchInternships = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/v1/internships/all');
        const sortedInternships = response.data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
        setInternships(sortedInternships);
      } catch (error) {
        console.error('Error fetching internships:', error);
      }
    };

    fetchInternships();
  }, []);

  const indexOfLastInternship = currentPage * internshipsPerPage;
  const indexOfFirstInternship = indexOfLastInternship - internshipsPerPage;
  const currentInternships = internships.slice(indexOfFirstInternship, indexOfLastInternship);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Layout >
    <div className={styles.internshipContainer}>
      {currentInternships.map((internship) => (
        <Card className={styles.internshipCard} key={internship.internshipId}>
          <Card.Img variant="top" src={data:image/jpeg;base64,${internship.imageData}} />
          <Card.Body>
            <Card.Title>{internship.title}</Card.Title>
            <Card.Text>{internship.description}</Card.Text>
            <Button variant="primary">Apply Now</Button>
          </Card.Body>
        </Card>
      ))}

      <Pagination className={styles.pagination}>
        {Array.from({ length: Math.ceil(internships.length / internshipsPerPage) }, (_, i) => (
          <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>
            {i + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  </Layout>
  );
};

export default StudentNewInternships;