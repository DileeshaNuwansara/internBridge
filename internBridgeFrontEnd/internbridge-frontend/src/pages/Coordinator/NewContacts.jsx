import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import styles from './NewContacts.module.scss';

const NewContacts = () => {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/v1/contacts/getAll');
            setContacts(response.data);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }

    };

        const handleApprove = async (id) => {
            try {
                await axios.put(`http://localhost:8081/api/v1/contacts/${id}/approve`);
                //sendEmailToHR(id);
                fetchContacts();

            } catch (error) {
                console.error('Error approving contact:', error);
            }
        };
    
        const handleDelete = async (id) => {
            try {
                await axios.delete(`http://localhost:8081/api/v1/contacts/${id}`);
                fetchContacts();
            } catch (error) {
                console.error('Error deleting contact:', error);
            }
        };

        const sendEmailToHR = async (id) => {
            try {
                await axios.post(`http://localhost:8081/api/v1/contacts/${id}/sendLoginDetails`);
            } catch (error) {
                console.error('Error sending email:', error);
            }
        };

        


    
    return (
        <Container className={styles.newContacts}>
            <Row>
                {contacts.map((contact) => (
                    <Col key={contact.id} md={12} className="mb-3">
                        <Card className={`${styles.contactCard} ${contact.status === 'Pending' ? styles.pending : styles.approved}`}>
                            <Card.Body className="d-flex justify-content-between align-items-center">
                                <div>
                                    <Card.Title>{contact.company}</Card.Title>
                                    <Card.Text><strong>Contact Name:</strong> {contact.name}</Card.Text>
                                    <Card.Text><strong>Email:</strong> {contact.email}</Card.Text>
                                    <Card.Text><strong>Phone:</strong> {contact.phone}</Card.Text>
                                    <Card.Text><strong>Positions:</strong> {contact.availablePositions}</Card.Text>
                                </div>
                                <div>
                                    {contact.status === 'Pending' ? (
                                        <>
                                            <Button variant="success" onClick={() => handleApprove(contact.id)}>Approve</Button>{' '}
                                            <Button variant="danger" onClick={() => handleDelete(contact.id)}>Delete</Button>
                                        </>
                                    ) : (
                                        <Card.Text className={styles.approvedText}>Approved</Card.Text>
                                    )}
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default NewContacts;