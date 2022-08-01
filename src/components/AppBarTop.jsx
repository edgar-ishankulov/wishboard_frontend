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
      <Row id='appbar' className=' w-100'>
        <Col className="col-md-4 col-sm-12 mt-sm-3 mt-md-0">
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Link to="/" style={{ display: 'inline' }}>
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

        <Col className="col-md-4 col-sm-0"></Col>

        <Col className="col-md-3 col-sm-12 mb-sm-3 mt-sm-1 mb-md-0 align-self-center">
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Link
              to="/profile"
              style={{ textDecoration: 'none', display: 'inline' }}
              >
              <Button
                startIcon={<SvgIcon component={wIcon} inheritViewBox />}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  whiteSpace: 'nowrap',
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
              <Link
              to="/profile"
              style={{ textDecoration: 'none', display: 'inline' }}
              >
                <Button
                  color="inherit"
                  size="medium"
                  sx={{
                    fontSize: '1rem',
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
    </AppBar>
  );
};
export default AppBarTop;
