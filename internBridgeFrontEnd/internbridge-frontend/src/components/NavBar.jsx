import {Navbar,Nav, Container} from 'react-bootstrap';



const NavBar = () =>{



    return (
        <>
            <Navbar bg="dark" variant='dark' expand="md" collapseOnSelect sticky="top">
                
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className='ms-auto'>
                

                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="/contact-us">Contact Us</Nav.Link>
                    <Nav.Link href="/about-us">About Us</Nav.Link>
                    <Nav.Link href="/company">Company</Nav.Link>
                    <Nav.Link href="/student">Student</Nav.Link>
                
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </>

    );
};

export default NavBar;