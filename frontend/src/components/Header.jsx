import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Button, Box, SvgIcon } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Logo from '../images/logo.png';
import { loginInfoEmail } from '../redux/loginInfoSlice';
import { loginInfoName } from '../redux/loginInfoSlice';
import { useSelector, useDispatch } from 'react-redux';
import { ReactComponent as wIcon } from '../images/W_icon.svg';
import LogoutIcon from '@mui/icons-material/Logout';
import AppBarTop from './AppBarTop';
import '../css/custom.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5050';

const Header = ({ removeToken, token }) => {
  const dispatch = useDispatch();
  const loginEmail = useSelector((state) => state.loginInfo.email);
  const loginName = useSelector((state) => state.loginInfo.name);

  const logMeOut = async () => {
    try {
      await axios({
        method: 'POST',
        url: `${API_URL}/logout`,
      });
      {
        dispatch(loginInfoEmail(''));
        dispatch(loginInfoName(''));

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
    <AppBarTop token={token} removeToken={removeToken} />
        <Row>
      <Container className="my-4 d-sm-none d-md-block">

              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Link to="/" style={{ display: 'inline', justifyContent: 'center' }}>
                <img src={Logo} />
            </Link>
              </Box>

      </Container>
        </Row>
    </>
  );
};

export default Header;
