import {Navbar,Nav, Container} from 'react-bootstrap';
import SignOutButton from '../Buttons/Button';

const AppNavbar = () =>{



    return (
        <>
<Navbar bg="dark" variant="dark" expand="lg">
  <Container>
    <Navbar.Brand href="/dashboard">InternBridge</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ms-auto">
        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
        <Nav.Link href="/projects">Projects</Nav.Link>
        <Nav.Link href="/profile">Profile</Nav.Link>
        <Nav.Link href="/settings">Settings</Nav.Link>
        <div>
        <SignOutButton/>
        </div>
        
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>
</>

    );
};

export default AppNavbar;

