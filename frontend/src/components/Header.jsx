import React from 'react';
import { Container } from 'react-bootstrap';
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
  console.log(token);
  return (
    <div>
      <Container className="d-flex justify-content-center my-5">
        <Box display="inline">
          <Link to="/">
            <Logo
              alt={title}
              style={{
                maxWidth: '18rem',
                maxHeight: '10rem',
              }}
            />
          </Link>
        </Box>
        <Box display="inline" alignSelf="center">
          {token == undefined ? (
            ''
          ) : (
            <Button
              variant="outlined"
              size="small"
              sx={{ ml: 5 }}
              onClick={logMeOut}
            >
              Logout
            </Button>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default Header;
