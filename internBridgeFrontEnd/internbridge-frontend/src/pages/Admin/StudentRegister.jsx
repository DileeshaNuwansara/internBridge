import React, { useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';
import axios from 'axios';
import Layout from '../../Layout/Layout';
const StudentRegister = () => {
  const [formData, setFormData] = useState({
    name: '',
    password: '',
    email: '',
    company: 'UOR', // Default value
    phone: '',
    role: 'ROLE_STUDENT', // Default value
    status: 'Register', // Default dropdown value
    scNumber: '',
    gpa: '',
    position: '',
    companyHrId: null, // Default null
    applicationIds: null, // Default null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const response = await axios.post('http://localhost:8081/api/v1/student/create', formData);
      setSuccessMessage('Student registered successfully!');
      console.log('Response:', response.data);
      setFormData({
        name: '',
        password: '',
        email: '',
        company: 'UOR',
        phone: '',
        role: 'ROLE_STUDENT',
        status: 'Register',
        scNumber: '',
        gpa: '',
        position: '',
        companyHrId: null,
        applicationIds: null,
      });
    } catch (error) {
      console.error('Error registering student:', error);
      setErrorMessage(
        error.response?.data?.message || 'An error occurred while registering the student.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
    <div className="container">
      <h2>Student Registration</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter student name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter student email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="formScNumber">
              <Form.Label>Student Number (scNumber)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter student number"
                name="scNumber"
                value={formData.scNumber}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="formGpa">
              <Form.Label>GPA</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                placeholder="Enter GPA"
                name="gpa"
                value={formData.gpa}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="formPosition">
          <Form.Label>Position</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter position"
            name="position"
            value={formData.position}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="formStatus">
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select Role</option>
            <option value="Registered">Registered</option>
            <option value="Approved">Approved</option>
            <option value="Hired">Hired</option>
            <option value="Rejected">Rejected</option>
            <option value="Applied">Applied</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Register'}
        </Button>
      </Form>

      {errorMessage && <p className="text-danger mt-3">{errorMessage}</p>}
      {successMessage && <p className="text-success mt-3">{successMessage}</p>}
    </div>
    </Layout>
  );
};

export default StudentRegister;
