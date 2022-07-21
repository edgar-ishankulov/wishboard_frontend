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
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ReactComponent as wIcon } from '../images/W_icon.svg';
import { ReactComponent as WLogo } from '../images/Wishboard_logo.svg';

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
    <Box >
      <AppBar position="static">
        <Toolbar>
<Link to='/'>
        <WLogo viewBox="0 -10 200 150" style={{maxHeight: '6rem' }} />
</Link>

          <Container className="d-flex justify-content-end">
            <Link to="/profile" style={{ textDecoration: 'none' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button
                  startIcon={<SvgIcon component={wIcon} inheritViewBox />}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    whiteSpace: 'nowrap',
                    mr: '1rem',
                    fontSize: '1rem',
                  }}
                  color="inherit"
                  size="medium"
                >
                  <Typography sx={{ color: 'white' }}>My Wishboard</Typography>
                </Button>
              </Box>
            </Link>

            {token == undefined || token == null ? (
              <Link to="/profile" style={{ textDecoration: 'none' }}>
                <Button color="inherit" size="medium" sx={{ fontSize: '1rem' }}>
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
          </Container>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default AppBarTop;
