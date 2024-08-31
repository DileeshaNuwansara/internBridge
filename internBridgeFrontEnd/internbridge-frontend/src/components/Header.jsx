import {Navbar,Nav, Container} from 'react-bootstrap';
import { FaUser } from 'react-icons/fa';


const Header = () =>{



    return (
        <header>
            <Navbar bg="dark" variant='dark' expand="md" collapseOnSelect>

            
            <Container>
                <Navbar.Brand href="/">internBridge</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className='ms-auto'>
                

                <Nav.Link href ="/home">
                    <h1>Home </h1>  
                </Nav.Link>
                <Nav.Link href ="/contact-us">
                    <h1>Contact Us </h1>  
                </Nav.Link>
                <Nav.Link href ="/about-us">          
                        <h1>About Us </h1>  
                </Nav.Link>
                <Nav.Link href ="/company">
                    <h1>Company </h1>  
                </Nav.Link>
                <Nav.Link href ="/student">
                    <h1>Student </h1>  
                </Nav.Link>
                <Nav.Link href ="/login"><FaUser/>
                    <h1>Sign In </h1>  
                </Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </header>

    )
}

export default Header;