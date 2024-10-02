import {Navbar,Nav, Container} from 'react-bootstrap';
import styles from './LandingNavbar.module.scss';
import { Link } from 'react-router-dom';

const LandingPageNavbar = () =>{



    return (
        <>
       <header className={styles.landingnavbar}>
        
            <Navbar variant='dark' expand="md" className={`py-2 ${styles.navbar}`} collapseOnSelect sticky="top">
                
            <Container className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
                <Navbar.Brand href="/" className="d-flex align-items-start me-4">
                  <img
                    src="./assets/image.png"
                    alt="InternBridge Logo"
                    style={{ width: '140px', height: '60px' }}
                    className="d-inline-block align-top me-3"
                  />
            </Navbar.Brand>

            <Navbar.Brand href="https://ruh.ac.lk/index.php/en/" className="d-flex align-items-center">
              <img
                src="./assets/ruhuna_logo.png"
                alt="University of Ruhuna Logo"
                style={{ width: '170px', height: '70px' }}
                className="d-inline-block align-top me-3"
              />
            </Navbar.Brand>
            </div>
            <Navbar.Toggle aria-controls="custom-navbar-nav" className={`collapsed ${styles['navbar-toggler']}`} />
            <Navbar.Collapse id="custom-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home" className={styles['nav-link']}>Home</Nav.Link>
              <Nav.Link href="/student" className={styles['nav-link']}>Testimonials</Nav.Link>
              <Nav.Link href="/contact-us" className={styles['nav-link']}>Contact Us</Nav.Link>
              <Nav.Link href="/Department" className={styles['nav-link']}>Department</Nav.Link>
              <Nav.Link href="/about-us" className={styles['nav-link']}>About Us</Nav.Link>
            </Nav>
                        
            <div className="ms-auto">
             
            <button className={styles.signInbtn}>
                <Link to="/sign-in" className="text-white text-decoration-none">
                  Sign In
                </Link>
              </button>
            </div>
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </header>
    </>
  );
};

export default LandingPageNavbar;