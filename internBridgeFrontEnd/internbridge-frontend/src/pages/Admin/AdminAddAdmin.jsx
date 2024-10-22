import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Layout/Layout';

const AdminAddAdmin = () => {

  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
    } catch (err) {
        setError('Error deleting admin.');
    }
};


// Redirect to register page
const handleAddUser = () => {
    navigate('/register');
};

return (
  <>
  <Layout role = {userRole}>
    <Container fluid>
        <Row className="my-3">
            <Col className="d-flex justify-content-start">
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

                                    <Button variant="danger" onClick={() => deleteAdmin(admin.userId)}>Delete</Button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        )}
    </Container>
    </Layout>
    </>
);
};

export default AdminAddAdmin;