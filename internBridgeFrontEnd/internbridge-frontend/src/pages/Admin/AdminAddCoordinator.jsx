import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Row, Col, Alert, Spinner,Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Layout/Layout';

const AdminAddCoordinator = () => {

  const [coordinators, setCoordinators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedCoordinator, setSelectedCoordinator] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCoordinators = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/v1/user/getCoordinators');
        setCoordinators(response.data);
      } catch (err) {
        setError('Error fetching coordinator.');
      } finally {
        setLoading(false);
      }
    };
    fetchCoordinators();
  }, []);

  
  const deleteCoordinator = async (userId) => {
    try {
      await axios.delete(`http://localhost:8081/api/v1/user/deleteUser/${userId}`);
      setCoordinators(coordinators.filter(coordinator => coordinator.userId !== userId));
    } catch (err) {
      setError('Error deleting Coordinator.');
    }
  };

  // Redirect to register page
  const handleAddUser = () => {
    navigate('/register');
  };

  const handleUpdate = (coordinator) => {
    setSelectedCoordinator(coordinator);
    setFormData(coordinator);
    setShowUpdateModal(true);
  };

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateSubmit = async () => {
    try {
      const response = await axios.put(`http://localhost:8081/api/v1/user/updateUser/${selectedCoordinator.userId}`, formData);
      setCoordinators(coordinators.map(coordinator => (coordinator.userId === response.data.userId ? response.data : coordinator)));
      setShowUpdateModal(false); 
    } catch (err) {
      setError('Error updating coordinator.');
    }
  };

  return (
    <>
    <Layout>
      <Container fluid>
        <Row className="my-3">
          <Col className="d-flex justify-content-between">
             <h2>Coordinator List</h2>
            <Button variant="primary" onClick={handleAddUser}>Add Coordinator</Button>
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
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Company</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {coordinators.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center">No Coordinator found.</td>
                </tr>
              ) : (
                coordinators.map(coordinator => (
                  <tr key={coordinator.userId}>
                    <td>{coordinator.userId}</td>
                    <td>{coordinator.name}</td>
                    <td>{coordinator.email}</td>
                    <td>{coordinator.company}</td>
                    <td>{coordinator.phone}</td>
                    <td>{coordinator.status}</td>
                    <td>
                    <Button
                        variant="success"
                        onClick={() => handleUpdate(coordinator.userId)}
                    >
                       Update State
                      </Button>
                      <Button variant="danger" onClick={() => deleteCoordinator(coordinator.userId)}>Delete</Button>
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
            <Modal.Title>Update Coodinator </Modal.Title>
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
              <Form.Group controlId="formCompany">
                <Form.Label>Company</Form.Label>
                <Form.Control type="text" name="company" value={formData.company || ''} onChange={handleChange} />
              </Form.Group>
              <Form.Group controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="text" name="phone" value={formData.phone || ''} onChange={handleChange} />
              </Form.Group>

              <Form.Group controlId="formStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control type="text" name="status" value={formData.status || ''} onChange={handleChange} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>

            <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>Close</Button>

            <Button variant="primary" onClick={handleUpdateSubmit}>Save Changes</Button>
          </Modal.Footer>
        </Modal>

    </Layout>
    </>
  );
};

export default AdminAddCoordinator;
