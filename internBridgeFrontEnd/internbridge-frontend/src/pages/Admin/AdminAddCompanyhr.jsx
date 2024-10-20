import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Layout from '../../Layout/Layout';

const AdminAddCompanyhr = () => {

  const [companyhr, setCompanyhr] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const history = useHistory(); 

  const userRole = localStorage.getItem("userRole");

   useEffect(() => {
    const fetchCompanyhr = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/v1/user/getCompanyHRs');
            setCompanyhr(response.data);
        } catch (err) {
            setError('Error fetching Companyhr.');
        } finally {
            setLoading(false);
        }
    };
    fetchCompanyhr();
}, []);

// Handle delete function
const deleteCompanyhr = async (userId) => {
    try {
        await axios.delete('http://localhost:8081/api/v1/user/deleteUser/${userId}');
        setCompanyhr(Companyhr.filter(Companyhr => Companyhr.userId !== userId));
    } catch (err) {
        setError('Error deleting Companyhr.');
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
                        {Companyhr.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center">No Company HR found.</td>
                            </tr>
                        ) : (
                            Companyhr.map(admin => (
                                <tr key={Companyhr.userId}>
                                    <td>{Companyhr.userId}</td>
                                    <td>{Companyhr.name}</td>
                                    <td>{Companyhr.email}</td>
				                            <td>{Companyhr.company}</td>
                                    <td>{Companyhr.phone}</td>
                                    <td>{Companyhr.status}</td>
                                    <td>

                                    <Button variant="danger" onClick={() => deleteCompanyhr(Companyhr.userId)}>Delete</Button>
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

export default AdminAddCompanyhr;