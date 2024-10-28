import React, { useState,useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Footer from '../../components/Footer/Footer';
import LandingPageNavbar from '../../components/LandingPageNavbar/LandingPageNavbar';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styles from './Contactus.module.scss';
import backgroundVideo from '../../assets/videos/video.mp4';  
import axios from 'axios';
export default function ContactUs() {

  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    company: ''
});

const handleChange = (e) => {
  const { name, value } = e.target;
  setContactData({ ...contactData, [name]: value });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
      await axios.post('http://localhost:8081/api/v1/contacts/create', contactData);
      alert('Your contact request has been submitted.');
  } catch (error) {
      console.error('Error submitting contact:', error.response?.data || error.message);
      alert('Error submitting contact.');
  }
};

  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);



  return (
    <>
      <LandingPageNavbar />

      <br/>

        <div className={styles.videoContainer}>
        <video className={styles.videoBackground} autoPlay muted loop>
          <source src={backgroundVideo} type="video/mp4" />
         </video>

         <br/>

          <div className={styles.contentOverlay}>
          <Container fluid className="text-white py-5">
          
            <Row className="justify-content-center">
              <br/><br/>
              <Col lg={6} data-aos="fade-up">
              <br/><br/>
                <h2 className="text-center mb-2">Get In Touch With Us</h2><br/>
                <h5 className="text-center mb-4">
                  We would welcome  you. Please fill out the form below and we’ll get back to you as soon as possible.
                </h5>

                <Form  onSubmit={handleSubmit} className={styles.contactContainer}>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Contact Name</Form.Label>
                    <Form.Control className={styles.contactFormInput} name="name" type="text" placeholder="Enter name" required onChange={handleChange} />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formCompany">
                    <Form.Label> Your Company</Form.Label>
                    <Form.Control className={styles.contactFormInput} name="company" type="text" placeholder="Enter  Company Name" required onChange={handleChange}/>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label> Email</Form.Label>
                    <Form.Control className={styles.contactFormInput} name="email" type="email" placeholder="Enter  email" required onChange={handleChange}/>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPhone">
                    <Form.Label> Phone No</Form.Label>
                    <Form.Control className={styles.contactFormInput} name="phone" type="text" placeholder="Enter phone number" required onChange={handleChange}/>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formMessage">
                    <Form.Label> Message</Form.Label>
                    <Form.Control className={styles.contactFormTextarea} name ="message" as="textarea" rows={4} placeholder="Enter your message" required onChange={handleChange}/>
                  </Form.Group>

                  <Button variant="primary" type="submit" className={`${styles.contactFormButton} w-100 py-2`}>
                   Say Hello ..
                  </Button>
                </Form>

                <div className="text-center mt-4 ">
                  <p>
                    <strong>Phone      :  </strong>  0 7 0   3 2   3 2   8 8 8 <br />
                    <strong>Email      :  </strong> S a y H e l l o i n t e r n B r i d g e @ g m a i l . c o m
                  </p>
                  <p>
                    <strong>Follow Us  :</strong> 
                    <a href="https://facebook.com/internbridgeUorCs" className="text-primary mx-2">Facebook</a>      |  
                    <a href="https://youtube.com" className="text-primary mx-2">YouTube</a>
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <br/>
      </div>
      

      <Footer />
    </>
  );
}
