import React, { useState } from 'react';
import './Register.scss';
import '../../App.scss';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FaUserShield } from "react-icons/fa";
import { BsShieldLockFill, BsFillTelephoneFill } from "react-icons/bs";
import { MdBusiness } from "react-icons/md";
import { Link } from 'react-router-dom';
import { GoPaperAirplane } from 'react-icons/go'; // Ensure to import GoPaperAirplane
import logo from '../../assets/imgs/internbridge_logo.png';

const Register = () => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        company: '',
        phone: '',
        password: '',
        role: 'admin',
        status: 'pending' // You can use this for tracking the registration status
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make an API call to your backend to register the user
            const response = await fetch('YOUR_API_ENDPOINT/register', { // Replace with your actual endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Registration failed!');
            }

            const data = await response.json();
            // Handle success (e.g., redirect or show a success message)
            console.log('Registration successful:', data);
        } catch (error) {
            // Handle error (e.g., show an error message)
            console.error('Error:', error);
        }
    };

    return (
        <Container className="register-page">
            <Row className="justify-content-center">
                <Col md={8} lg={6} className="form-container">
                    <div className="text-center mb-4">
                        <img src={logo} alt="InternBridge Logo" className="logo-img" />
                        <h2>Create an Admin Account</h2>
                        <p>Join the platform as an admin to manage job opportunities.</p>
                    </div>

                    <div className="formDiv flex">
                        <div className="headerDiv">
                            <h3>Let Register as an Admin</h3>
                        </div>

                        <Form onSubmit={handleSubmit} className="form">
                            {/* Email */}
                            <Form.Group controlId="email" className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <div className="input-group">
                                    <FaUserShield className="input-icon" />
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </Form.Group>

                            {/* Name */}
                            <Form.Group controlId="name" className="mb-3">
                                <Form.Label>Full Name</Form.Label>
                                <div className="input-group">
                                    <FaUserShield className="input-icon" />
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </Form.Group>

                            {/* Company */}
                            <Form.Group controlId="company" className="mb-3">
                                <Form.Label>Company</Form.Label>
                                <div className="input-group">
                                    <MdBusiness className="input-icon" />
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your company name"
                                        value={formData.company}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </Form.Group>

                            {/* Phone */}
                            <Form.Group controlId="phone" className="mb-3">
                                <Form.Label>Phone</Form.Label>
                                <div className="input-group">
                                    <BsFillTelephoneFill className="input-icon" />
                                    <Form.Control
                                        type="tel"
                                        placeholder="Enter your phone number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </Form.Group>

                            {/* Password */}
                            <Form.Group controlId="password" className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <div className="input-group">
                                    <BsShieldLockFill className="input-icon" />
                                    <Form.Control
                                        type="password"
                                        placeholder="Create a password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </Form.Group>

                            {/* Hidden Role */}
                            <Form.Control type="hidden" id="role" value={formData.role} />

                            {/* Submit Button */}
                            <Button type="submit" className='btn flex'>
                                <span>Register</span>
                                <GoPaperAirplane className='icon' />
                            </Button>
                        </Form>

                        <div className="text-center mt-3">
                            <span>Already have an account?</span>
                            <Link to="/signin"> Sign In</Link>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
