import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Row, Col, Alert, Spinner , Modal,Form} from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Layout/Layout';

const AdminAddCompanyhr = () => {
  const [companyhrs, setCompanyhrs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedCompanyhr, setSelectedCompanyhr] = useState(null);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  // Fetch Company HR data
  useEffect(() => {
    const fetchCompanyhrs = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/v1/user/getCompanyHRs');
        setCompanyhrs(response.data);
        
        
      } catch (err) {
        setError('Error fetching Company HR.');
        alert('Companyhr fetching uncessfully!');
       
      } finally {
        setLoading(false);
      }
    };
    fetchCompanyhrs();
  }, []);

  // Handle delete function
  const deleteCompanyhr = async (userId) => {
    try {
      await axios.delete(`http://localhost:8081/api/v1/user/deleteUser/${userId}`);
      setCompanyhrs(companyhrs.filter(hr => hr.userId !== userId));
      alert('Companyhr deleted successfully!');
      
    } catch (err) {
      setError('Error deleting Company HR.');
      alert('Companyhr deleted unsuccessfully!');
    }
  };

  // Redirect to register page
  const handleAddUser = () => {
    navigate('/register');
  };

  const handleUpdate = (companyhr) => {
    setSelectedCompanyhr(companyhr);
    setFormData(companyhr);
    setShowUpdateModal(true);
    
    
};

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateSubmit = async () => {
    try {
      const response = await axios.put(`http://localhost:8081/api/v1/user/updateUser/${selectedCompanyhr.userId}`, formData);
      setCompanyhrs(companyhrs.map(companyhr => (companyhr.userId === response.data.userId ? response.data : companyhr)));
      setShowUpdateModal(false); 
      alert('Company hr updated successfully!');
    } catch (err) {
      setError('Error updating companyhr.');
      alert('Error updating companyhr.')
    }
  };

  return (
    <>
      <Layout>
        <Container fluid>
          <Row className="my-3">
            <Col className="d-flex justify-content-between">
              <h2>Company HR List</h2>
              <Button variant="primary" onClick={handleAddUser}>Add Company HR</Button>
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
                {companyhrs.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center">No Company HR found.</td>
                  </tr>
                ) : (
                  companyhrs.map(hr => (
                    <tr key={hr.userId}>
                      <td>{hr.userId}</td>
                      <td>{hr.name}</td>
                      <td>{hr.email}</td>
                      <td>{hr.company}</td>
                      <td>{hr.phone}</td>
                      <td>{hr.status}</td>
                      <td>
                      <Button
                          variant="success"
                          onClick={() => handleUpdate(hr)}>Update</Button>

                        <Button variant="danger" onClick={() => deleteCompanyhr(hr.userId)}>
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
                <Form.Control
                  as="select"
                  name="status"
                  value={formData.status || ''}
                  onChange={handleChange}
                  required
                >
                  <option value="Registered">Registered</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancelled">Cancelled</option>
                </Form.Control>
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

export default AdminAddCompanyhr;
