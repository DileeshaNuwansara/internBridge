import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Row, Col, Alert, Spinner, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Layout/Layout';

const AdminAddAdmin = () => {

  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  const userRole = localStorage.getItem("userRole");

   useEffect(() => {
    const fetchAdmins = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/v1/user/getAdmins');
            setAdmins(response.data);
        } catch (err) {
            setError('Error fetching admins.');
        } finally {
            setLoading(false);
        }
    };
    fetchAdmins();
}, []);

// Handle delete function
const deleteAdmin = async (userId) => {
    try {
        await axios.delete(`http://localhost:8081/api/v1/user/deleteUser/${userId}`);
        setAdmins(admins.filter(admin => admin.userId !== userId));
        alert('Deleted Admin.')
    } catch (err) {
        setError('Error deleting admin.');
        alert('Error deleting admin.');
    }
};


// Redirect to register page
const handleAddUser = () => {
    navigate('/register');
};

const handleUpdate = (admin) => {
    setSelectedAdmin(admin);
    setFormData(admin);
    setShowUpdateModal(true);
};

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateSubmit = async () => {
    try {
      const response = await axios.put(`http://localhost:8081/api/v1/user/updateUser/${selectedAdmin.userId}`, formData);
      setAdmins(admins.map(admin => (admin.userId === response.data.userId ? response.data : admin)));
      setShowUpdateModal(false); 
      alert('Admin details updated.')
    } catch (err) {
      setError('Error updating admin.');
      alert('Admin details Updating is failed')
    }
  };

return (
  <>
  <Layout role = {userRole}>
    <Container fluid>
        <Row className="my-3">
            
            <Col className="d-flex justify-content-between">
                <h2>Admin List</h2>
                <Button variant="primary" onClick={handleAddUser}>Add User</Button>
            </Col>
        </Row>
        {loading ? (
            <div className="d-flex justify-content-center">
                <Spinner animation="border" />
            </div>
        ) : error ? (
            <Alert variant="danger">{error}</Alert>
        ) : (

            <>

            
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
                        {admins.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center">No admins found.</td>
                            </tr>
                        ) : (
                            admins.map(admin => (
                                <tr key={admin.userId}>
                                    <td>{admin.userId}</td>
                                    <td>{admin.name}</td>
                                    <td>{admin.email}</td>
					                          <td>{admin.company}</td>
                                    <td>{admin.phone}</td>
                                    <td>{admin.status}</td>
                                    <td>

                                    <Button
                                        variant="success"
                                        onClick={() => handleUpdate(admin)}>Update</Button>

                                    <Button variant="danger" onClick={() => deleteAdmin(admin.userId)}>Delete</Button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        
        </>
        )}
    </Container>

    <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Update Admin</Modal.Title>
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

export default AdminAddAdmin;