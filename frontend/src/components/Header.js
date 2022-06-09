import React from "react"
import Navbar from 'react-bootstrap/Navbar'
import Container from "react-bootstrap/Container";

const navbarStyle = {
  backgroundColor: 'lightblue'
}

const Header = (props) => {
    return (
        <Navbar variant="light" style={navbarStyle}>
    <Container>
    <Navbar.Brand href="#home">{props.title}</Navbar.Brand>
    
    </Container>
  </Navbar>
    )
};

export default Header;

