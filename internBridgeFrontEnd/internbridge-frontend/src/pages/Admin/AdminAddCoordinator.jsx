import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Layout from '../../Layout/Layout';

const AdminAddCoordinator = () => {

  const [coordinator, setCoordinator] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory(); 

  const userRole = localStorage.getItem("userRole");

   useEffect(() => {
    const fetchCoordinator = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/v1/user/getCoordinators');
            setCoordinator(response.data);
        } catch (err) {
            setError('Error fetching coordinator.');
        } finally {
            setLoading(false);
        }
    };
    fetchCoordinator();
}, []);

// Handle delete function
const deleteCoordinator = async (userId) => {
    try {
        await axios.delete('http://localhost:8081/api/v1/user/deleteUser/${userId}');
        setCoordinator(coordinator.filter(coordinator => coordinator.userId !== userId));
    } catch (err) {
        setError('Error deleting Coordinator.');
    }
};

// Redirect to register page
const handleAddUser = () => {
    history.push('/register');
};

return (
  <>
  <Layout>
    <Container fluid>
        <Row className="my-3">
            <Col className="d-flex justify-content-start">
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
                        {coordinator.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center">No Coordinator found.</td>
                            </tr>
                        ) : (
                            admins.map(admin => (
                                <tr key={coordinator.userId}>
                                    <td>{coordinator.userId}</td>
                                    <td>{coordinator.name}</td>
                                    <td>{coordinator.email}</td>
				    <td>{coordinator.company}</td>
                                    <td>{coordinator.phone}</td>
                                    <td>{coordinator.status}</td>
                                    <td>

                                    <Button variant="danger" onClick={() => deleteCoordinator(coordinator.userId)}>Delete</Button>
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

export default AdminAddCoordinator;