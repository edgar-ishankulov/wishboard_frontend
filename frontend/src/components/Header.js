import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { ReactComponent as Logo } from '../images/logo.svg';

const navbarStyle = {
  backgroundColor: 'white',
  marginTop: '1rem',
};

const Header = ({ title }) => {
  return (
    <Navbar variant="light" style={navbarStyle}>
      <Container className="d-flex justify-content-center mt-2">
        <Logo alt={title} style={{ maxWidth: '13rem', maxHeight: '4rem' }} />
      </Container>
    </Navbar>
  );
};

export default Header;
