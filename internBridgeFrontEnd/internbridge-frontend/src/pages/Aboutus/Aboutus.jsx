import React from 'react';
import { Container, Row, Col, Image, Card, Button, Accordion } from 'react-bootstrap';
import NavBar from '../../components/LandingPageNavbar/LandingPageNavbar';
import Footer from '../../components/Footer/Footer';
import styles from './Aboutus.module.scss';

import Carousel from 'react-bootstrap/Carousel';
const Aboutus = () => {



  return (
    <>
      <section>
        <NavBar/>
      </section>
      {/* Page Content */}
      
      <div className={styles['aboutus-page']}>
      <header className={styles.header}>
        
          <h1 className={`${styles.headertitle} text-center `}>About InternBridge</h1>
     
      </header>

      <Container className="py-12">
        {/* Section 1: Introduction */}
        <Row className="mb-8 justify-content-center">
          
        <Col md={1} className="d-flex  mx-auto my-auto justify-content-center">
              <Carousel data-bs-theme="dark">
        <Carousel.Item>
          <img
            className="d-block  mx-auto w-auto h-20 "
             src="/assets/internbridge11.png"

            alt="First slide"
          />
          <Carousel.Caption>
            <h3>Welcome You</h3>
            <p>InternBridge connects university students with internship opportunities in the IT industry.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block  mx-auto my-auto w-60  "
             src="/assets/internbridge12.png"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Connect with InterBrige</h3>
            <p>InternBridge aims to bridge the gap between education and the IT job market</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block  mx-auto my-auto "
            src="/assets/internbridge13.png"

            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Offer an Opportunities</h3>
            <p>
            browsing and offer an internships.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
           className="d-block  mx-auto my-auto "
           src="/assets/internbridge14.png"

            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Enhance student's employability.</h3>
            <p>
            Enhance skills and mindful development with personalized career guidance.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
              </Carousel>
          </Col>

        </Row>
        <Row>
        <Col  my={5} md={8}>
            <h2  className={styles.sectiontitle}>Our InternBridge - Platform to offer an Internships</h2>
            <p className={styles.sectiontext}>
              InternBridge is a platform developed to connect students of the University of Ruhuna with
              leading companies in the tech industry. It provides a gateway for students to gain practical
              experience through internships and industrial visits.
            </p>
          </Col>
        </Row>

        {/* Section 2: University Contacts */}
        <Row className="mb-4">
          <Col md={6}>
            <Image src=".\assets\ruhuna_logo.png" fluid alt="University of Ruhuna" />
          </Col>
          <Col md={6}>
            <h2 className={styles.sectiontitle}>Contact - University of Ruhuna</h2>
            <p className={styles.sectiontext}>
              <strong>University of Ruhuna</strong><br />
              Matara, Sri Lanka<br />
              <strong>Department of Computer Science</strong><br />
              Phone: +94 41 222 2681<br />
              Email: cs@ruh.ac.lk
            </p>
          </Col>
        </Row>

        {/* Section 3: Department Overview */}
        <Row className="mb-5">
          <Col md={12}>
            <h2 className={styles.sectiontitle}>Department of Computer Science - University of Ruhuna</h2>
            <p className={styles.sectiontext}>
              The Department of Computer Science of the University of Ruhuna is the oldest and one of the most esteemed computer science departments in the Sri Lankan university system. Established in 1997, it offers undergraduate, postgraduate, and specialized training programs. The department also provides ICT consultancy services and software solutions, playing a vital role in both academia and the broader community.
            </p>
          </Col>
        </Row>

        {/* Section 4: Software Engineering Opportunities */}
        <Row className="mb-5">
          <Col md={6}>
            <h2 className={styles.sectiontitle}>Software Engineering & Job Opportunities</h2>
            <p className={styles.sectiontext}>
              Software engineering offers extensive job opportunities for our interns. InternBridge enables students to connect with top-tier companies in search of innovative and hardworking individuals. Our students are well-prepared with the latest technical skills and real-world experience.
            </p>
          </Col>
          <Col md={6}>
            <Image src="./assets/Softwareengineer.jpg" fluid alt="Software Engineering Opportunities" />
          </Col>
        </Row>

        {/* Section 5: Why Hire Our Interns */}
        <Row className="mb-5">
          <Col md={6}>
            <Image src="./assets/intern.jpg" fluid alt="Internship Benefits" />
          </Col>
          <Col md={6}>
            <h2 className={styles.sectiontitle}>Why Companies Should Hire Our Interns</h2>
            <p className={styles.sectiontext}>
              Our students possess excellent coding skills, problem-solving abilities, and practical experience. They can manage relationships with clients and contribute to projects from day one. Many internships turn into full-time positions, making InternBridge a valuable resource for companies seeking top talent.
            </p>
          </Col>
        </Row>

        {/* Section 6: Meet Our Team */}
        <Row className="mb-5">
          <Col>
            <h2 className={`${styles.sectiontitle} text-center`}>Meet Our Team</h2>
            <p className="text-center">
              Behind every successful venture is a team of passionate individuals. Our Computer Science department at the University of Ruhuna thrives because of our dedicated faculty and staff. Get to know the faces behind InternBridge’s success.
            </p>
          </Col>
        </Row>

        {/* Section 7: Vision & Mission */}
        <Row className="mb-5">
          <Col md={6}>
            <h2 className={styles.sectiontitle}>Our Vision</h2>
            <p className={styles.sectiontext}>
              InternBridge envisions a world where every student can achieve their dreams of education and employment. We aim to be the beacon of hope for students on their journey toward success in the tech industry.
            </p>
          </Col>
          <Col md={6}>
            <h2 className={styles.sectiontitle}>Our Mission</h2>
            <p className={styles.sectiontext}>
              Our mission is to provide comprehensive solutions for education, employment, and internship opportunities. We ensure that students not only succeed academically but also grow into valued professionals in the IT industry.
            </p>
          </Col>
        </Row>

        {/* Section 8: FAQ Section */}
        <Row className="mb-5">
          <Col>
            <h2 className={`${styles.sectiontitle} text-center`}>Frequently Asked Questions</h2>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>What are the key benefits of University Education?</Accordion.Header>
                <Accordion.Body>
                  University education provides numerous benefits, including acquiring knowledge, fostering critical thinking, building social connections, and opening doors to a wide range of opportunities.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>How does education contribute to personal growth?</Accordion.Header>
                <Accordion.Body>
                  Education contributes to personal growth by equipping individuals with knowledge, developing skills, and fostering a sense of responsibility and community involvement.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Does InternBridge offer opportunities for all students?</Accordion.Header>
                <Accordion.Body>
                  Yes, InternBridge provides platforms and opportunities for eligible students to secure internships and industrial training, particularly for students in level 3 and above.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>

        {/* Section 9: Final Call to Action */}
        <Row className="text-center">
          <Col>
            <Card className={`styles['call-to-action']} p-4`}>
              <h3>Get Involved with InternBridge</h3>
              <p>
                If you're a company looking for talented interns or a student interested in gaining hands-on experience, contact us today to start your journey with InternBridge!
              </p>
              <Button variant="primary" size="lg">Contact Us</Button>
            </Card>
          </Col>
        </Row>

        {/* Section 10: Social Links */}
        <Row className="text-center mt-4">
          <Col>
            <h4>Connect with Us</h4>
            <p>Follow the Computer Science Department on:</p>
            <Button variant="outline-primary" className={`{styles.btn} m-2`}>LinkedIn</Button>
            <Button variant="outline-secondary" className={`{styles.btn} m-2`}>YouTube</Button>
            <Button variant="outline-primary" className={`{styles.btn} m-2`}>Facebook</Button>
          </Col>
        </Row>
      </Container>
    </div>
    <div/>
    
      <div>
        <Footer/>
      </div>
    </>
  );
};

export default Aboutus;
