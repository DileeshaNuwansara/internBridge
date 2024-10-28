import React, { useState } from 'react';
import { Button, Container, Form, Row, Col, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './GetOtpPage.module.scss';
import Footer from '../../components/Footer/Footer';
import LandingPageNavbar from '../../components/LandingPageNavbar/LandingPageNavbar';

const GetOtpPage = () => {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email || '';
  
    const handleOtpChange = (e) => setOtp(e.target.value);

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:8081/api/v1/forgotPwd/verifyotp/{otp}/{email}', {
            email,
            otp,
          });
    
          if (response.data.success) {
            navigate('/reset-password"');
          } else {
            setError('Invalid OTP. Please try again.');
          }
        } catch (err) {
          setError('Failed to verify OTP. Please try again later.');
        }
      };
    
      return (

        <Container className={styles.otpContainer}>
        <LandingPageNavbar/>
          <Row className="justify-content-md-center">
            <Col md={6} xs={12}>
              <h3 className="text-center">OTP Verification</h3>
              <p className="text-center">Enter the OTP sent to your email address</p>
              <Form onSubmit={handleVerifyOtp} className={styles.form}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" value={email} readOnly />
                </Form.Group>
                <Form.Group controlId="formOtp" className="mt-3">
                  <Form.Label>Enter OTP</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={handleOtpChange}
                    required
                  />
                </Form.Group>
                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
                <Button variant="primary" type="submit" className="mt-4 w-100">
                  Verify OTP
                </Button>
              </Form>
            </Col>
          </Row>
          <Footer/>
        </Container>
      );
    };
    
    export default GetOtpPage;