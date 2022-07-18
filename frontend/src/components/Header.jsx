import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Button, Box, Paper, SvgIcon } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import { ReactComponent as Logo } from '../images/logo.svg';
import Logo from '../images/logo.png';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { loginInfoEmail } from '../redux/loginInfoSlice';
import { loginInfoName } from '../redux/loginInfoSlice';
import { useSelector, useDispatch } from 'react-redux';
import { ReactComponent as wIcon } from '../images/W_icon.svg'
import LogoutIcon from '@mui/icons-material/Logout';


const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5050';

const theme = createTheme();

theme.typography.h3 = {
  fontSize: '0.5rem',
  '@media (min-width:400px)': {
    fontSize: '1.2rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '0.5rem',
  },
};



const Header = ({ title, removeToken, token }) => {
const dispatch = useDispatch()
const loginEmail = useSelector((state) => state.loginInfo.email);
const loginName = useSelector(
  (state) => state.loginInfo.name
);


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
      <Container className="my-4">
        <Row>
          <Col className="col-lg-4"></Col>

          <Col className=" col-lg-4 col-12 col-sm-12 align-self-center mt-1 mb-2">
            <Link to="/" style={{ display: 'flex', justifyContent: 'center'}}>
              {/* <Logo
                alt={title}
                style={{
                  maxWidth: '10rem',
                  maxHeight: '10rem',
                }}
              /> */}
              <Box sx={{display:'flex'}}>

              <img src={Logo} />
              </Box>
            </Link>
          </Col>

          <Col className=" d-inline text-center col-lg-4 justify-content-end align-self-center mt-3 mt-md-2">
            <Container>
          <ThemeProvider theme={theme}>
            <Link to="/profile" style={{ textDecoration: 'none' }}>
              <Button startIcon={<SvgIcon component={wIcon} inheritViewBox />}
                sx={{ whiteSpace: 'nowrap', mr: '1rem', fontSize: '0.5rem',  }}
                variant="contained"
                size="medium"
                type="button"
              > <Typography variant="h3" sx={{position: 'relative', top: 1}}  >My Wishboard</Typography>
                
              </Button>
            </Link>

            {token == undefined || token == null ? (
              <Link to="/profile" style={{ textDecoration: 'none' }}>
                <Button
                  variant="outlined"
                  size="medium"
                  sx={{ fontSize: '0.5rem' }}
                  >
                  <Typography variant="h3">Login</Typography>
                </Button>
              </Link>
            ) : (
              <Button
              startIcon={<LogoutIcon />}
              variant="outlined"
              size="medium"
              onClick={logMeOut}
              sx={{ fontSize: '0.5rem' }}
              >
                 <Typography variant="h3">Logout</Typography>
              </Button>
            )}
            </ThemeProvider>
            </Container>
          </Col>
        </Row>
            {/* {loginName !== '' ? 
            <Container className='position-absolute justify-content-end align-self-start '>
              <Paper elevation={5} sx={{display: 'inline-block', paddingX:2, paddingY:0.5, position: 'relative', top: 20}}>
            <h5>Hi {loginName}! Wish and visualize for a brighter tomorrow!</h5>
            </Paper>
            </Container> : ''
            } */}

      </Container>
    </>
  );
};

export default Header;
