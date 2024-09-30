import React, { useState } from 'react';
import styles from './Register.module.scss';
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
        status: 'pending' 
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
    };

    return (
        
        <Container className={`${styles.registerPage} flex`}> 
            <Row className={`${styles.rcontainer} flex`}>
                <Col lg={5} className="d-flex flex-column align-items-center justify-content-center ">
                    <div className={styles.registerDiv}>
                        <img src={logo} alt="InternBridge Logo" />
                        <h2>Create an Admin Account</h2>
                        <p>Join the platform as an admin to manage job opportunities.</p>
                    </div>
                </Col>
            
            
                <Col lg={7} className="d-flex flex-column align-items-center">
                    <div className={styles.formDiv}>
                        <h3>Let Register as an Admin</h3>
                    

                        <Form onSubmit={handleSubmit} className={styles.form}>
                                {/* Email */}
                                <Form.Group controlId="email" className="mb-6">
                                    <Form.Label>Email</Form.Label>
                                    <div className={styles.inputGroup}>
                                    <FaUserShield className={styles.inputIcon} />
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
                                <Form.Group controlId="name" className="mb-6">
                                    <Form.Label>Full Name</Form.Label>
                                    <div className={styles.inputGroup}>
                                        <FaUserShield className={styles.inputIcon} />
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
                                <Form.Group controlId="company" className="mb-6">
                                    <Form.Label>Company</Form.Label>
                                    <div className={styles.inputGroup}>
                                        <MdBusiness className={styles.inputIcon} />
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
                                <Form.Group controlId="phone" className="mb-6">
                                    <Form.Label>Phone</Form.Label>
                                    <div className={styles.inputGroup}>
                                    <BsFillTelephoneFill className={styles.inputIcon} />
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
                                <Form.Group controlId="password" className="mb-6">
                                    <Form.Label>Password</Form.Label>
                                    <div className={styles.inputGroup}>
                                        <BsShieldLockFill className={styles.inputIcon} />
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
                                <Button type="submit" className={styles.cbtn}>
                                    <span>Register</span>
                                    <GoPaperAirplane className={styles.icon} />
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
