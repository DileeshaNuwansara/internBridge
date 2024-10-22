import React from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styles from './Testimonials.module.scss'; 
import ListGroup from 'react-bootstrap/ListGroup';
import NavBar from '../../components/LandingPageNavbar/LandingPageNavbar';
import Footer from '../../components/Footer/Footer';

// Function to import photos dynamically from the directory
const importAll = (r) => {
    let images = {};
    r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
    return images;
};

// Use require.context to load images from the imgs directory
const images = importAll(require.context('./imgs', false, /\.(png|jpe?g|svg)$/));

const Testimonials = () => {
    const testimonials = [
        {
            name: 'Kavindu Jayasinghe',
            post: images['testi1.png'],
            position: 'Software Engineer at SLT Mobitel', 
        },
        {
            name: 'Ayesha Fernando',
            post: images['testi6.png'],
            position: 'UI/UX Designer at Xiteb', 
        },
        {
            name:  'Hansi Wickramasinghe',
            post: images['testi5.png'],
            position: 'Senior Quality Assurance Engineer at Wavenet', 
        },
        {
            name: 'Sandun Perera',
            post: images['testi2.png'],
            position: 'Software Engineer at Creative Software', 
        },
        {
            name:  'Nadeesha Silva',
            post: images['testi3.png'],
            position: 'Associate Software Engineer at SLT Mobitel', 
        },
        {
            name: 'Harsha Jayawardena',
            post: images['testi4.png'],
            position: 'Technical Lead at Arimac', 
        }
    ];

    return (
        <>
            
            <section>
                <NavBar/>
            </section>
            <div className={styles['testimonials-page']}>
            <section id="testimonials" className="py-5 bg-light">
                <Container>
                    <header className={styles.header}>
                    
        
                    <h1 className={`${styles.headertitle} text-center `}>Our Alumni Testimonials</h1>
   
                    </header>

                    <p className="text-center mb-5">
                        Hear from our alumni who have grown into industry leaders after completing their internships and training. Their success stories are a testament to the foundation they built during their time with us.
                    </p>

                    <Row>
                        {testimonials.map((testimonial, index) => (
                            <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
                                <Card className="card">
                                    <Card.Img variant="top" src={testimonial.post} alt={testimonial.name} />
                                    <Card.Body className="card-body">
                                        <Card.Title className="card-title">{testimonial.name}</Card.Title>
                                        <Card.Text className="card-text">
                                            "I am deeply grateful to the InternBridge program for helping me secure my internship offer. As a student,
                                            InternBridge made the process smooth and guided me every step of the way. Thanks to this incredible platform, I was able to connect with leading companies and showcase my skills."
                                        </Card.Text>
                                    </Card.Body>
                                    <ListGroup className="list-group-flush">
                                        <ListGroup.Item>I highly encourage hiring students through InternBridge. Students bring fresh perspectives, enthusiasm, and the latest technical knowledge.</ListGroup.Item>
                                        <ListGroup.Item>Member of InternBridge</ListGroup.Item>
                                        <ListGroup.Item>Member of {testimonial.position}</ListGroup.Item>
                                    </ListGroup>
                                    <Card.Body>
                                        <Card.Link href="/">"Thanks to the opportunities InternBridge provided."</Card.Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>
            </div>
            <div>
                <Footer/>
            </div>
        </>
    );
}

export default Testimonials;
