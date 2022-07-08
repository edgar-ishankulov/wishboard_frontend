import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Button, Box } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../images/logo.svg';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5050';

const Header = ({ title, removeToken, token }) => {
  const logMeOut = async () => {
    try {
      await axios({
        method: 'POST',
        url: `${API_URL}/logout`,
      });
      {
        removeToken();
      }
    } catch {
      (error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      };
    }
  };
  return (
    <>
      <Container className='my-5'>
        <Row>
<Col className='col-lg-4'></Col>

          <Col className=' col-lg-4 col-12 col-sm-12 align-self-center mt-3 mb-2'>
          <Link to="/" style={{ display: 'flex', justifyContent: 'center' }}>
            <Logo
              alt={title}
              style={{
                maxWidth: '18rem',
                maxHeight: '10rem',
              }}
            />
          </Link>
          </Col>

          <Col className=' d-inline text-center col-lg-4 justify-content-end align-self-center align-middle mt-1.5 mt-md-0'>
          <Link
            to="/profile"
            style={{ textDecoration: 'none' }}
          >
            <Button
              sx={{ whiteSpace: 'nowrap', mr: '1rem', fontSize: "0.5rem" }}
              variant="contained"
              size="medium"
              type="button"
            >
              My Wishboard
            </Button>
          </Link>

          {token == undefined || token == null ? (

            <Link
              to="/profile"
              style={{ textDecoration: 'none' }}
            >
              <Button variant="outlined" size="medium"  sx={{ fontSize: "0.5rem" }}>
                Login
              </Button>
            </Link>

          ) : (

            <Button
              variant="outlined"
              size="medium"
              onClick={logMeOut}
              sx={{ fontSize: "0.5rem" }}
            >
              Logout
            </Button>
          )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Header;
