import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import SignInButton from './Buttons/SignInButton';
import SignUpButton from './Buttons/SignUpButton';

const Header = () => {
  return (
    <header className="sticky-top">
      <Navbar bg="red" variant="light" expand="md" className="py-2">
        <Container className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <Navbar.Brand href="/" className="d-flex align-items-center me-4">
              <img
                src="./assets/image.png"
                alt="InternBridge Logo"
                style={{ width: '180px', height: '90px' }}
                className="d-inline-block align-top me-3"
              />
            </Navbar.Brand>

            <Navbar.Brand href="https://ruh.ac.lk/index.php/en/" className="d-flex align-items-center">
              <img
                src="./assets/ruhuna_logo.png"
                alt="University of Ruhuna Logo"
                style={{ width: '220px', height: '90px' }}
                className="d-inline-block align-top me-3"
              />
            </Navbar.Brand>
          </div>

          <div className="auth-buttons d-flex align-items-center">
            <SignInButton />
            <SignUpButton />
          </div>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
