import React, { useEffect, useState } from 'react';
import { Card, Button, Pagination } from 'react-bootstrap';
import axios from 'axios';
import Layout from '../../Layout/Layout';

import styles from './CoordinatorManageInternships.module.scss';

const ManageNewInternships = () => {
  const [internships, setInternships] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const internshipsPerPage = 5;

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

  const handleDelete = async (internshipId) => {
    try {
      await axios.delete(`http://localhost:8081/api/v1/internships/delete/${internshipId}`);
      setInternships(internships.filter((internship) => internship.internshipId !== internshipId));
    } catch (error) {
      console.error('Error deleting internship:', error);
    }
  };

  const indexOfLastInternship = currentPage * internshipsPerPage;
  const indexOfFirstInternship = indexOfLastInternship - internshipsPerPage;
  const currentInternships = internships.slice(indexOfFirstInternship, indexOfLastInternship);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const userRole = localStorage.getItem('role');

  return (
    <Layout role = {userRole} >
      <div className={styles.internshipContainer} >
        {currentInternships.map((internship) => (
          <Card className={styles.internshipCard} key={internship.internshipId}>
            <Card.Img variant="top" src={`data:image/jpeg;base64,${internship.imageData}`} />
            <Card.Body>
              <Card.Title>{internship.title}</Card.Title>
              <Card.Text>{internship.description}</Card.Text>
              <Card.Text>{internship.company}</Card.Text>
              <Card.Text>{internship.position}</Card.Text>
              <Card.Text>{internship.availablePositions}</Card.Text>
              <Button variant="success" className={styles.acceptBtn}>Accept</Button>
              <Button variant="danger" onClick={() => handleDelete(internship.internshipId)}>Delete</Button>
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

export default ManageNewInternships;
