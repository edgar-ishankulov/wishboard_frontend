import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  SvgIcon,
} from '@mui/material';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ReactComponent as wIcon } from '../images/W_icon.svg';
import { ReactComponent as WLogo } from '../images/Wishboard_logo.svg';
import '../css/custom.css';

import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector, useDispatch } from 'react-redux';
import { loginInfoEmail } from '../redux/loginInfoSlice';
import { loginInfoName } from '../redux/loginInfoSlice';

import axios from 'axios';
import { maxWidth } from '@mui/system';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5050';

const AppBarTop = ({ token, removeToken }) => {
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
    <AppBar position="static">
      {/* <Container className="d-flex"> */}
      {/* <Toolbar> */}
      <Row className="align-items-center">
        <Col className="col-md-4 col-12">
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Link to='/' style={{display: "inline"}}>
            <WLogo
              viewBox="-34 -10 210 150"
              style={{
                maxHeight: '6rem',
                position: 'relative',
                // display: 'flex',
                right: '0',
              }}
            />
            </Link>
          </Box>
        </Col>

        <Col className="col-md-4 col-12"></Col>

        <Col className="col-md-3 col-12 mt-2">
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Link to="/profile" style={{ textDecoration: 'none', display: "inline", }}>
            <Button
              startIcon={<SvgIcon component={wIcon} inheritViewBox />}
              sx={{
                display: 'flex',
                alignItems: 'center',
                whiteSpace: 'nowrap',
                // mr: '2rem',
                fontSize: '1rem',
              }}
              color="inherit"
              size="medium"
            >
              <Typography sx={{ color: 'white' }}>My Wishboard</Typography>
            </Button>

            </Link>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            {token == undefined || token == null ? (
              <Link to="/profile" style={{ textDecoration: 'none', display: "inline", }}>
              <Button
                color="inherit"
                size="medium"
                sx={{ fontSize: '1rem',
                //  mr: '2rem'
                 }}
              >
                <Typography sx={{ color: 'white' }}> Login </Typography>
              </Button>
              </Link>
            ) : (
              <Button
                startIcon={<LogoutIcon />}
                color="inherit"
                size="medium"
                onClick={logMeOut}
                sx={{ fontSize: '1rem' }}
              >
                <Typography sx={{ color: 'white' }}>Logout</Typography>
              </Button>
            )}
          </Box>
        </Col>
      </Row>
      {/* </Toolbar> */}
      {/* </Container> */}
    </AppBar>
  );
};
export default AppBarTop;
