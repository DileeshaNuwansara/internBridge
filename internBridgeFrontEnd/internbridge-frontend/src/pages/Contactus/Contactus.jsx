import React, { useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import Footer from '../../components/Footer/Footer';
import LandingPageNavbar from '../../components/LandingPageNavbar/LandingPageNavbar';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styles from './Contactus.module.scss';
import backgroundVideo from '../../assets/videos/video.mp4';  

export default function ContactUs() {
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

                <Form className={styles.contactContainer}>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Contact Name</Form.Label>
                    <Form.Control className={styles.contactFormInput} type="text" placeholder="Enter name" required />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label> Email</Form.Label>
                    <Form.Control className={styles.contactFormInput} type="email" placeholder="Enter  email" required />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formPhone">
                    <Form.Label> Phone No</Form.Label>
                    <Form.Control className={styles.contactFormInput} type="text" placeholder="Enter phone number" required />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formMessage">
                    <Form.Label> Message</Form.Label>
                    <Form.Control className={styles.contactFormTextarea} as="textarea" rows={4} placeholder="Enter your message" required />
                  </Form.Group>

                  <Button variant="primary" type="submit" className={`${styles.contactFormButton} w-100 py-2`}>
                   Say Hello ..
                  </Button>
                </Form>

                <div className="text-center mt-4 ">
                  <p>
                    <strong>Phone      :  </strong>  0 7 0   3 2   3 2   8 8 8 <br />
                    <strong>Email      :  </strong> c o n t a c t i n t e r n b r i d g e @ g m a i l . c o m
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
