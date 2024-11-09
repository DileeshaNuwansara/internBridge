// // import React, { useEffect, useState } from 'react';
// // import { Table, Button, Spinner, Card, Modal, Form } from 'react-bootstrap';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom'; 
// // import styles from './InternshipDetails.module.scss'; 
// // import Layout from '../../Layout/Layout';
// // const InternshipDetails = () => {
// //   const user_id = localStorage.getItem('userId'); 
// //   const navigate = useNavigate();

// //     const [internships, setInternships] = useState([]);
// //     const [loading, setLoading] = useState(true);
// //     const [showModal, setShowModal] = useState(false);
// //     const [isEditing, setIsEditing] = useState(false);
// //     const [currentInternship, setCurrentInternship] = useState(null);
// //     const [formData, setFormData] = useState({
// //         title: '',
// //         description: '',
// //         requirements: '',
// //         position: '',
// //         startDate: '',
// //         availablePositions: 0,
// //         company: '',
// //     });

     

// //     useEffect(() => {
// //         const fetchInternships = async () => {
// //             try {
// //                 const response = await axios.get(`/api/v1/internships/companyHr/${user_id}`);
// //                 setInternships(response.data);
// //                 setLoading(false);
// //             } catch (error) {
// //                 console.error('Error fetching internships:', error);
// //                 setLoading(false);
// //             }
// //         };

// //         fetchInternships();
// //     }, [user_id]);

// //     const handleViewAppliedStudents = (internshipId) => {
// //         navigate(`/view-applied-students/${internshipId}`);
// //     };

// //     const handleShowModal = () => setShowModal(true);
// //     const handleCloseModal = () => {
// //         setShowModal(false);
// //         setIsEditing(false);
// //         setFormData({
// //             title: '',
// //             description: '',
// //             requirements: '',
// //             position: '',
// //             startDate: '',
// //             availablePositions: 0,
// //             company: '',
// //             user_id: user_id,
// //         });
// //     };

// //     const handleCreate = async (e) => {
// //         e.preventDefault();
// //         try {
// //            // if (isEditing) {
// //               //  await axios.put(`/api/v1/internships/update/${currentInternship.internshipId}`, formData);
                
// //               //  alert("Successfully  updated an Internship.");
// //            // } else {
// //                 await axios.post(`/api/v1/internships/create/${user_id}`, formData);
// //                 alert("Successfully created  an Internship.");
// //             //}
// //             handleCloseModal();
            
// //             setLoading(true); 
// //             const response = await axios.get(`/api/v1/internships/companyHr/${user_id}`);
// //             setInternships(response.data);
// //             setLoading(false);
// //         } catch (error) {
// //             console.error('Error creating internship:', error);
// //             alert("Error creating/updating internship");
// //         }
// //     };

// //     const handleEdit = (internship) => {
// //         setCurrentInternship(internship);
// //         setFormData(internship);
// //         setIsEditing(true);
// //         handleShowModal();
// //     };

// //     const handleDelete = async (internshipId) => {
// //         try {
// //             console.log(formData);
// //             await axios.delete(`/api/v1/internships/delete/${internshipId}`);
// //             setLoading(true); 
// //             const response = await axios.get(`/api/v1/internships/companyHr/${user_id}`);
// //             setInternships(response.data);
// //             alert('Successfully deleted the expired internship.')
// //             setLoading(false);
// //         } catch (error) {
// //             console.error('Error deleting internship:', error);
// //             alert('Error with deletion of internship.')
// //         }
// //     };

// //     if (loading) {
// //         return <Spinner animation="border" className={styles.spinner} />;
// //     }

// //     const  userRole = localStorage.getItem('role');

// //     return (
// //         <Layout role = {userRole}>
// //             <h2>Internship Details</h2>
// //         <div className={styles.container}>
            
// //             <Button variant="primary" className={styles.createButton} onClick={handleShowModal}>
// //                 Create New Internship
// //             </Button>
// //             <div className={styles.internshipsContainer}>
// //                 {internships.length > 0 ? (
// //                     internships.map((internship) => (
// //                         <Card key={internship.internshipId} className={styles.internshipCard}>
// //                             <Card.Body>
// //                                 <Card.Title>Title : {internship.title}</Card.Title>
// //                                 <Card.Text>
// //                                     <strong>Description:</strong> {internship.description}
// //                                 </Card.Text>
// //                                 <Card.Text>
// //                                     <strong>Requirements:</strong> {internship.requirements}
// //                                 </Card.Text>
// //                                 <Card.Text>
// //                                     <strong>Position:</strong> {internship.position}
// //                                 </Card.Text>
// //                                 <Card.Text>
// //                                     <strong>Available Positions:</strong> {internship.availablePositions}
// //                                 </Card.Text>
// //                                 <Button variant="info" onClick={() => handleViewAppliedStudents(internship.internshipId)}>
// //                                     View Applied Students
// //                                 </Button>
// //                                 <Button variant="warning" onClick={() => handleEdit(internship)}>
// //                                     Edit
// //                                 </Button>
// //                                 <Button variant="danger" onClick={() => handleDelete(internship.internshipId)}>
// //                                     Delete
// //                                 </Button>
// //                             </Card.Body>
// //                         </Card>
// //                     ))
// //                 ) : (
// //                     <p>No internships found.</p>
// //                 )}
// //             </div>

// //             <Modal show={showModal} onHide={handleCloseModal}>
// //                 <Modal.Header closeButton>
// //                     <Modal.Title>{isEditing ? 'Edit Internship' : 'Create Internship'}</Modal.Title>
// //                 </Modal.Header>
// //                 <Modal.Body>
// //                     <Form onSubmit={handleCreate}>
// //                         <Form.Group controlId="formTitle">
// //                             <Form.Label>Title</Form.Label>
// //                             <Form.Control
// //                                 type="text"
// //                                 value={formData.title}
// //                                 onChange={(e) => setFormData({ ...formData, title: e.target.value })}
// //                                 required
// //                             />
// //                         </Form.Group>
// //                         <Form.Group controlId="formDescription">
// //                             <Form.Label>Description</Form.Label>
// //                             <Form.Control
// //                                 as="textarea"
// //                                 rows={3}
// //                                 value={formData.description}
// //                                 onChange={(e) => setFormData({ ...formData, description: e.target.value })}
// //                                 required
// //                             />
// //                         </Form.Group>
// //                         <Form.Group controlId="formRequirements">
// //                             <Form.Label>Requirements</Form.Label>
// //                             <Form.Control
// //                                 as="textarea"
// //                                 rows={3}
// //                                 value={formData.requirements}
// //                                 onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
// //                                 required
// //                             />
// //                         </Form.Group>
// //                         <Form.Group controlId="formPosition">
// //                             <Form.Label>Position</Form.Label>
// //                             <Form.Control
// //                                 type="text"
// //                                 value={formData.position}
// //                                 onChange={(e) => setFormData({ ...formData, position: e.target.value })}
// //                                 required
// //                             />
// //                         </Form.Group>
// //                         <Form.Group controlId="formStartDate">
// //                             <Form.Label>Start Date</Form.Label>
// //                             <Form.Control
// //                                 type="date"
// //                                 value={formData.startDate}
// //                                 onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
// //                                 required
// //                             />
// //                         </Form.Group>
// //                         <Form.Group controlId="formAvailablePositions">
// //                             <Form.Label>Available Positions</Form.Label>
// //                             <Form.Control
// //                                 type="number"
// //                                 value={formData.availablePositions}
// //                                 onChange={(e) => setFormData({ ...formData, availablePositions: e.target.value })}
// //                                 required
// //                             />
// //                         </Form.Group>
// //                         <Button variant="primary" type="submit">
// //                             {isEditing ? 'Update Internship' : 'Create Internship'}
// //                         </Button>
// //                     </Form>
// //                 </Modal.Body>
// //             </Modal>
// //         </div>
// //         </Layout>
// //     );
// // };

// // export default InternshipDetails;

// import React, { useEffect, useState } from 'react';
// import { Button, Modal, Form, Card, Spinner } from 'react-bootstrap';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; 
// import styles from './InternshipDetails.module.scss'; 
// import Layout from '../../Layout/Layout';

// const InternshipDetails = () => {
//     const user_id = localStorage.getItem('userId'); 
//     const navigate = useNavigate();

//     const [internships, setInternships] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [showModal, setShowModal] = useState(false);
//     const [formData, setFormData] = useState({
//         title: '',
//         description: '',
//         requirements: '',
//         position: '',
//         startDate: '',
//         availablePositions: 0,
//         company: '',
//     });

//     useEffect(() => {
//         const fetchInternships = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8081/api/v1/internships/companyHr/${user_id}`);
//                 setInternships(response.data);
//             } catch (error) {
//                 console.error('Error fetching internships:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchInternships();
//     }, [user_id]);

//     const handleShowModal = () => setShowModal(true);
//     let response;
//     const handleCloseModal = () => {
//         setShowModal(false);
//         setFormData({
//             title: response.data.title,
//             description: '',
//             requirements: '',
//             position: '',
//             startDate: '',
//             availablePositions: 0,
//             company: '',
//         });
//     };

//     const handleCreate = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post(`http://localhost:8081/api/v1/internships/create/${user_id}`, formData);
//             alert("Successfully created an Internship.");

//             // Fetch updated internship list after creation
//             setLoading(true);
//             response = await axios.get(`http://localhost:8081/api/v1/internships/companyHr/${user_id}`);
//             setInternships(response.data);
//             console.log(response);
//         } catch (error) {
//             console.error('Error creating internship:', error);
//             alert("Error creating internship.");
//         } finally {
//             setLoading(false);
//             handleCloseModal();
//         }
//     };

//     if (loading) {
//         return <Spinner animation="border" className={styles.spinner} />;
//     }

//     return (
//         <Layout role={localStorage.getItem('role')}>
//             <h2>Internship Details</h2>
//             <div className={styles.container}>
//                 <Button variant="primary" className={styles.createButton} onClick={handleShowModal}>
//                     Create New Internship
//                 </Button>

//                 <div className={styles.internshipsContainer}>
//                     {internships.length > 0 ? (
//                         internships.map((internship) => (
//                             <Card key={internship.internshipId} className={styles.internshipCard}>
//                                 <Card.Body>
//                                     <Card.Title>Title : {internship.title}</Card.Title>
//                                     <Card.Text><strong>Description:</strong> {internship.description}</Card.Text>
//                                     <Card.Text><strong>Requirements:</strong> {internship.requirements}</Card.Text>
//                                     <Card.Text><strong>Position:</strong> {internship.position}</Card.Text>
//                                     <Card.Text><strong>Available Positions:</strong> {internship.availablePositions}</Card.Text>
//                                 </Card.Body>
//                             </Card>
//                         ))
//                     ) : (
//                         <p>No internships found.</p>
//                     )}
//                 </div>

//                 <Modal show={showModal} onHide={handleCloseModal}>
//                     <Modal.Header closeButton>
//                         <Modal.Title>Create Internship</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <Form onSubmit={handleCreate}>
//                             <Form.Group controlId="formTitle">
//                                 <Form.Label>Title</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     value={formData.title}
//                                     onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//                                     required
//                                 />
//                             </Form.Group>
//                             <Form.Group controlId="formDescription">
//                                 <Form.Label>Description</Form.Label>
//                                 <Form.Control
//                                     as="textarea"
//                                     rows={3}
//                                     value={formData.description}
//                                     onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                                     required
//                                 />
//                             </Form.Group>
//                             <Form.Group controlId="formRequirements">
//                                 <Form.Label>Requirements</Form.Label>
//                                 <Form.Control
//                                     as="textarea"
//                                     rows={3}
//                                     value={formData.requirements}
//                                     onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
//                                     required
//                                 />
//                             </Form.Group>
//                             <Form.Group controlId="formPosition">
//                                 <Form.Label>Position</Form.Label>
//                                 <Form.Control
//                                     type="text"
//                                     value={formData.position}
//                                     onChange={(e) => setFormData({ ...formData, position: e.target.value })}
//                                     required
//                                 />
//                             </Form.Group>
//                             <Form.Group controlId="formStartDate">
//                                 <Form.Label>Start Date</Form.Label>
//                                 <Form.Control
//                                     type="date"
//                                     value={formData.startDate}
//                                     onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
//                                     required
//                                 />
//                             </Form.Group>
//                             <Form.Group controlId="formAvailablePositions">
//                                 <Form.Label>Available Positions</Form.Label>
//                                 <Form.Control
//                                     type="number"
//                                     value={formData.availablePositions}
//                                     onChange={(e) => setFormData({ ...formData, availablePositions: e.target.value })}
//                                     required
//                                 />
//                             </Form.Group>
//                             <Button variant="primary" type="submit">Create Internship</Button>
//                         </Form>
//                     </Modal.Body>
//                 </Modal>
//             </div>
//         </Layout>
//     );
// };

// export default InternshipDetails;

import React, { useEffect, useState } from 'react';
import { Table, Button, Spinner, Card, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import styles from './InternshipDetails.module.scss'; 
import Layout from '../../Layout/Layout';

const InternshipDetails = () => {
  const user_id = localStorage.getItem('userId'); 
  const navigate = useNavigate();

  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentInternship, setCurrentInternship] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    position: '',
    startDate: '',
    availablePositions: 0,
    company: '',
  });

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/v1/internships/companyHr/${user_id}`);
        setInternships(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching internships:', error);
        setLoading(false);
      }
    };
    fetchInternships();
  }, [user_id]);

  const handleViewAppliedStudents = (internshipId) => {
    navigate(`/ROLE_COMPANYHR/applied-students/${internshipId}`);
  };

  const handleShowModal = () => setShowModal(true);

  const handleCloseModal = () => {
    setShowModal(false);
    setIsEditing(false);
    setFormData({
      title: '',
      description: '',
      requirements: '',
      position: '',
      startDate: '',
      availablePositions: 0,
      company: '',
    });
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    try {
      if (isEditing && currentInternship) {
        // Update Internship
        await axios.put(`http://localhost:8081/api/v1/internships/update/${currentInternship.internshipId}`, formData);
        alert("Successfully updated the internship.");
      } else {
        // Create Internship
        await axios.post(`http://localhost:8081/api/v1/internships/create/${user_id}`, formData);
        alert("Successfully created an internship.");
      }
      handleCloseModal();
      setLoading(true);
      const response = await axios.get(`http://localhost:8081/api/v1/internships/companyHr/${user_id}`);
      setInternships(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error creating/updating internship:', error);
      alert("Error creating/updating internship.");
    }
  };

  const handleEdit = (internship) => {
    setCurrentInternship(internship);
    setFormData(internship);
    setIsEditing(true);
    handleShowModal();
  };

  const handleDelete = async (internshipId) => {
    try {
      await axios.delete(`http://localhost:8081/api/v1/internships/delete/${internshipId}`);
      setLoading(true);
      const response = await axios.get(`http://localhost:8081/api/v1/internships/companyHr/${user_id}`);
      setInternships(response.data);
      alert('Successfully deleted the internship.');
      setLoading(false);
    } catch (error) {
      console.error('Error deleting internship:', error);
      alert('Error deleting internship.');
    }
  };

  if (loading) {
    return <Spinner animation="border" className={styles.spinner} />;
  }

  const userRole = localStorage.getItem('role');

  return (
    <Layout role={userRole}>
      <h2>Internship Details</h2>
      <div className={styles.container}>
        <Button variant="primary" className={styles.createButton} onClick={() => { setIsEditing(false); handleShowModal(); }}>
          Create New Internship
        </Button>
        <div className={styles.internshipsContainer}>
          {internships.length > 0 ? (
            internships.map((internship) => (
              <Card key={internship.internshipId} className={styles.internshipCard}>
                <Card.Body>
                  <Card.Title>Title: {internship.title}</Card.Title>
                  <Card.Text><strong>Description:</strong> {internship.description}</Card.Text>
                  <Card.Text><strong>Requirements:</strong> {internship.requirements}</Card.Text>
                  <Card.Text><strong>Position:</strong> {internship.position}</Card.Text>
                  <Card.Text><strong>Available Positions:</strong> {internship.availablePositions}</Card.Text>
                  {/* <Button variant="info" onClick={() => handleViewAppliedStudents(internship.internshipId)}>
                    View Applied Students
                  </Button><br/>
                  <Button variant="warning" onClick={() => handleEdit(internship)}>
                    Update
                  </Button>
                  <Button variant="danger" onClick={() => handleDelete(internship.internshipId)}>
                    Delete
                  </Button> */}


<div className="buttonContainer">
  {/* Full-width View Applied Students button */}
  <Button 
    variant="info" 
    onClick={() => handleViewAppliedStudents(internship.internshipId)}
    style={{
      width: '100%',
      marginBottom: '10px',
      fontWeight: 'bold',
      color: '#fff'
    }}
  >
    View Applied Students
  </Button>
  
  {/* Container for Update and Delete buttons */}
  <div style={{ display: 'flex', gap: '10px' }}>
    <Button 
      variant="warning" 
      onClick={() => handleEdit(internship)}
      style={{
        flex: 1,
        fontWeight: 'bold',
        color: '#fff'
      }}
    >
      Update
    </Button>
    
    <Button 
      variant="danger" 
      onClick={() => handleDelete(internship.internshipId)}
      style={{
        flex: 1,
        fontWeight: 'bold',
        color: '#fff'
      }}
    >
      Delete
    </Button>
  </div>
</div>

                </Card.Body>
              </Card>
            ))
          ) : (
            <p>No internships found.</p>
          )}
        </div>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{isEditing ? 'Update Internship' : 'Create Internship'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleCreateOrUpdate}>
              <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formRequirements">
                <Form.Label>Requirements</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formPosition">
                <Form.Label>Position</Form.Label>
                <Form.Control
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formStartDate">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formAvailablePositions">
                <Form.Label>Available Positions</Form.Label>
                <Form.Control
                  type="number"
                  value={formData.availablePositions}
                  onChange={(e) => setFormData({ ...formData, availablePositions: e.target.value })}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                {isEditing ? 'Update Internship' : 'Create Internship'}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </Layout>
  );
};

export default InternshipDetails;
