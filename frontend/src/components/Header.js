import React from "react"
import Navbar from 'react-bootstrap/Navbar'
import Container from "react-bootstrap/Container";

const Header = ({title}) => {
    return (
        <Navbar bg="light" variant="light">
    <Container fluid className="justify-content-center mt-4">
    <Navbar.Brand href="#home">{title}</Navbar.Brand>
    
    </Container>
  </Navbar>

    )
};

export default Header;

