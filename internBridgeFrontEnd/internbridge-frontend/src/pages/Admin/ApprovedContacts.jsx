import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import styles from './ApprovedContacts.module.scss';

const ApprovedContacts = () => {
    const [approvedContacts, setApprovedContacts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchApprovedContacts();
    }, []);

    const fetchApprovedContacts = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/v1/contacts/approved');
            setApprovedContacts(response.data);
        } catch (error) {
            console.error('Error fetching approved contacts:', error);
        }
    };

    const handleAccept = (contact) => {
        navigate('/register', { state: { contact } });
    };

    return (
        <Container className={styles.approvedContacts}>
            <Row>
                {approvedContacts.map((contact) => (
                    <Col key={contact.id} md={12} className="mb-3">
                        <Card className={`${styles.contactCard} ${styles.approved}`}>
                            <Card.Body className="d-flex justify-content-between align-items-center">
                                <div>
                                    <Card.Title>{contact.company}</Card.Title>
                                    <Card.Text><strong>Contact Name:</strong> {contact.name}</Card.Text>
                                    <Card.Text><strong>Email:</strong> {contact.email}</Card.Text>
                                    <Card.Text><strong>Phone:</strong> {contact.phone}</Card.Text>
                                    <Card.Text><strong>Positions:</strong> {contact.availablePositions}</Card.Text>
                                </div>
                                <Button variant="primary" onClick={() => handleAccept(contact)}>Register</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ApprovedContacts;