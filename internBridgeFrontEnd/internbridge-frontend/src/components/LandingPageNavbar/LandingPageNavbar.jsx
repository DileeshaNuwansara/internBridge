import {Navbar,Nav, Container} from 'react-bootstrap';
import './LandingNavbar.scss';


const LandingPageNavbar = () =>{



    return (
        <>
        <header className='landingnavbar'>

        
            <Navbar variant='dark' expand="md" className="py-2" collapseOnSelect sticky="top">
                
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
            <Navbar.Toggle aria-controls="custom-navbar-nav" className="collapsed" />
            <Navbar.Collapse id="custom-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/student">Testimonials</Nav.Link>
              <Nav.Link href="/contact-us">Contact Us</Nav.Link>
              <Nav.Link href="/Department">Department</Nav.Link>
              <Nav.Link href="/about-us">About Us</Nav.Link>
            </Nav>
                        {/* Sign In Button aligned to the right */}
            <div className="ms-auto">
             
              <button className='signInbtn'>Sign In</button>
            </div>
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </header>
    </>
  );
};

export default LandingPageNavbar;