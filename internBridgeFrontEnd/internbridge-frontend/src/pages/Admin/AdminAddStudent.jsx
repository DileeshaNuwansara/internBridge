import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Row, Col, Alert, Spinner, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import Layout from '../../Layout/Layout';
import { useNavigate } from 'react-router-dom';


const AdminAddStudent = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  // Fetch the list of students from the backend
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/v1/student/getAll');
        setStudents(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching students');
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleAddUser = () => {
    navigate('/register');
  };


  // Handle deleting a student by ID
  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:8081/api/v1/student/remove/${userId}`);
      setStudents(students.filter(student => student.userId !== userId));
      alert("Student deleted successfully");
    } catch (error) {
      
      console.error("Error deleting student", error);
      alert("Failed to delete student");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleUpdate = (student) => {
    setSelectedStudent(student);
    setFormData(student);
    setShowUpdateModal(true);
  };

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateSubmit = async () => {
    try {
      const response = await axios.put(`http://localhost:8081/api/v1/student/update/${selectedStudent.userId}`, formData);
      setStudents(students.map(student => (student.userId === response.data.userId ? response.data : student)));
      setShowUpdateModal(false); 
      alert('Student updating successfully.')
    } catch (err) {
      setError('Error updating student.');
      alert('Error updating student.');
    }
  };

  return (
    <Layout>
     <Container fluid>
      <Row className="my-3">
        <Col className="d-flex justify-content-between">
          <h2>Student List</h2>
          <Button variant="primary" onClick={handleAddUser}>Add Student</Button>
        </Col>
      </Row>
        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" />
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (

        
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              
              <th>Status</th>
              <th>SC Number</th>
              <th>GPA</th>
              <th>Position</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {students.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center">No Student found.</td>
                </tr>
              ) : (
              students.map(student => (
              <tr key={student.userId}>
                <td>{student.userId}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                
                <td>{student.status}</td>
                <td>{student.scNumber}</td>
                <td>{student.gpa}</td>
                <td>{student.position}</td>
                <td>
                <Button
                    variant="success"
                    onClick={() => handleUpdate(student)}
                  >
                   Update State
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(student.userId)}
                  >
                    Delete
                  </Button>
                </td>
                </tr>
                ))
              )}
            </tbody>
          </Table>
        )}
      </Container>


      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Update Student</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={formData.name || ''} onChange={handleChange} />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={formData.email || ''} onChange={handleChange} />
              </Form.Group>
            
              <Form.Group controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" name="phone" value={formData.phone || ''} onChange={handleChange} />
              </Form.Group>
              <Form.Group controlId="formStatusSelect">
                  <Form.Label>Status</Form.Label>
                  <Form.Select name="status" value={formData.status || ''} onChange={handleChange}>
                    <option value="" disabled>Select Status</option>
                    <option value="Registered">Registered</option>
                    <option value="Applied">Applied</option>
                    <option value="Hired">Hired</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Interviewed">Interviewed</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId="formScNumber">
                <Form.Label>SC Number</Form.Label>
                <Form.Control type="text" name="scNumber" value={formData.scNumber || ''} onChange={handleChange} />
              </Form.Group>
              <Form.Group controlId="formGPA">
                <Form.Label>GPA</Form.Label>
                <Form.Control type="number" name="gpa" value={formData.gpa || ''} onChange={handleChange} />
              </Form.Group>

              <Form.Group controlId="formStatus">
                <Form.Label>Position</Form.Label>
                <Form.Control type="text" name="position" value={formData.position || ''} onChange={handleChange} />
              </Form.Group>

              
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>Close</Button>
            <Button variant="primary" onClick={handleUpdateSubmit}>Save Changes</Button>
          </Modal.Footer>
        </Modal>
    </Layout>
  );
};

export default AdminAddStudent;
