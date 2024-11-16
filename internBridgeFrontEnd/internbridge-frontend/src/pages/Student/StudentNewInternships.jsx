// import React, { useEffect, useState } from 'react';
// import { Card, Button, Pagination } from 'react-bootstrap';
// import axios from 'axios';
// import styles from './StudentNewInternships.module.scss';
// import Layout from '../../Layout/Layout';

// const StudentNewInternships = () => {
//   const [applied, setApplied] = useState(false);
//   const [internships, setInternships] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const internshipsPerPage = 5;

//   //const userRole = localStorage.getItem("userRole");
//   const studentId = localStorage.getItem('userId');
  

//   useEffect(() => {
//     const fetchInternships = async () => {
//       try {
//         const response = await axios.get('http://localhost:8081/api/v1/internships/all');
//         const sortedInternships = response.data.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
//         setInternships(sortedInternships);
//       } catch (error) {
//         console.error('Error fetching internships:', error);
//       }
//     };

//     fetchInternships();
//   }, []);

//   const indexOfLastInternship = currentPage * internshipsPerPage;
//   const indexOfFirstInternship = indexOfLastInternship - internshipsPerPage;
//   const currentInternships = internships.slice(indexOfFirstInternship, indexOfLastInternship);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <Layout>
//       <h2 className={styles.title}>Your Internships</h2>
//       <div className={styles.internshipContainer}>

      
//         {currentInternships.map((internship) => (
//           <Card className={styles.internshipCard} key={internship.internshipId}>
//           <Card.Img variant="top" src={`data:image/jpeg;base64,${internship.imageData}`} />
//           <Card.Body>
//             <Card.Title>{internship.title}</Card.Title>
//             <Card.Text>{internship.description}</Card.Text>
//             {/* Additional fields */}
//             <Card.Text><strong>Position :</strong> {internship.position}</Card.Text>
//             <Card.Text><strong>Start Date :</strong> {internship.startDate}</Card.Text>
//             <Card.Text><strong>Available Positions :</strong> {internship.availablePositions}</Card.Text>
//             <Card.Text><strong>Requirements :</strong> {internship.requirements}</Card.Text>
//             <Card.Text><strong>Comppany :</strong> {internship.company}</Card.Text>
//             <Button variant="primary">Apply Now</Button>
//           </Card.Body>
//         </Card>
//         ))}

//         <Pagination className={styles.pagination}>
//           {Array.from({ length: Math.ceil(internships.length / internshipsPerPage) }, (_, i) => (
//             <Pagination.Item key={i + 1} active={i + 1 === currentPage} onClick={() => paginate(i + 1)}>
//               {i + 1}
//             </Pagination.Item>
//           ))}
//         </Pagination>
//       </div>
//     </Layout>
//   );
// };

// export default StudentNewInternships;
import React, { useEffect, useState } from 'react';
import { Card, Button, Pagination } from 'react-bootstrap';
import axios from 'axios';
import styles from './StudentNewInternships.module.scss';
import Layout from '../../Layout/Layout';

const StudentNewInternships = () => {
  const [internships, setInternships] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [appliedInternships, setAppliedInternships] = useState([]);
  const internshipsPerPage = 5;

  const studentId = localStorage.getItem('userId');

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

  const handleApply = async (internshipId) => {
    try {
      const response = await axios.post('http://localhost:8081/api/v1/application/apply', {
        studentId,
        internshipId,
      });

      if (response.status === 200) {
        // Update applied internships and button state
        setAppliedInternships((prev) => [...prev, internshipId]);
        alert('You applied for this internship');
      }
    } catch (error) {
      console.error('Error applying for internship:', error);
    }
  };

  return (
    <Layout>
      <h2 className={styles.title}>Your Internships</h2>
      <div className={styles.internshipContainer}>
        {currentInternships.map((internship) => (
          <Card className={styles.internshipCard} key={internship.internshipId}>
            <Card.Img variant="top" src = "../src/assets/imgs/interviewsimg.png" />
            <Card.Body>
              <Card.Title>{internship.title}</Card.Title>
              <Card.Text>{internship.description}</Card.Text>
              <Card.Text><strong>Position :</strong> {internship.position}</Card.Text>
              <Card.Text><strong>Start Date :</strong> {internship.startDate}</Card.Text>
              <Card.Text><strong>Available Positions :</strong> {internship.availablePositions}</Card.Text>
              <Card.Text><strong>Requirements :</strong> {internship.requirements}</Card.Text>
              <Card.Text><strong>Company :</strong> {internship.company}</Card.Text>
              
              {/* Apply Now Button */}
              <Button
                variant="primary"
                onClick={() => handleApply(internship.internshipId)}
                disabled={appliedInternships.includes(internship.internshipId)} // Disable if already applied
              >
                {appliedInternships.includes(internship.internshipId) ? 'Applied' : 'Apply Now'}
              </Button>
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
