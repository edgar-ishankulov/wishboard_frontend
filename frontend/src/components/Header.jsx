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
      <Container id="1" className="d-flex justify-content-between my-5">
        <Container></Container>
        <Container className="d-flex justify-content-center">
          <Link to="/">
            <Logo
              alt={title}
              style={{
                maxWidth: '18rem',
                maxHeight: '10rem',
              }}
            />
          </Link>
        </Container>

        <Container className="d-flex justify-content-end align-self-center">
          <Link to="/profile" style={{ textDecoration: 'none', alignSelf: 'center' }}>
            <Button
              sx={{ whiteSpace: 'nowrap', mr: '1rem' }}
              variant="contained"
              size="small"
              type="button"
            >
              My Wishboard
            </Button>
          </Link>

          {token == undefined || token == null ? (
            <Link to="/profile" style={{ textDecoration: 'none', alignSelf: 'center' }}>
              <Button variant="outlined" size="small">
                Login
              </Button>
            </Link>
          ) : (
            <Button
              variant="outlined"
              size="small"
              // sx={{ ml: 5 }}
              onClick={logMeOut}
            >
              Logout
            </Button>
          )}
        </Container>
      </Container>
    </>
  );
};

export default Header;
