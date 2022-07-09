import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FormControl,
  InputLabel,
  Input,
  Button,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import '../css/custom.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5050';

function Login({ setToken }) {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const [loginError, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [loginPassError, setLoginPassError] = useState(false);
  const [notVerifiedError, setNotVerifiedError] = useState(false);


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setLoginPassError(false);
    setNotVerifiedError(false)
  };

  const logMeIn = async (event) => {
    try {
      const res = await axios({
        method: 'POST',
        url: `${API_URL}/token`,
        data: {
          email: loginForm.email,
          password: loginForm.password,
        },
      });
      setToken(res.data.access_token);
    } catch (error) {
      if (error.response.status == '401') {
        // navigate('/', { replace: true });
        setLoginPassError(true);
        console.log(error.response.status);
      }
      if (error.response.status == '402') {
        // navigate('/', { replace: true });
        setNotVerifiedError(true);
        console.log(error.response.status);
      }
    }
    setLoginForm({
      email: '',
      password: '',
    });
    if (event && event.preventDefault) { e.preventDefault(); }
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  useEffect(() => {
    function checkForm() {
      if (!isValidEmail(loginForm.email)) {
        setError('Email is invalid');
      } else {
        setError(null);
      }
    }
    checkForm();
  }, [loginForm.email]);

  function handleChange(event) {
    const { value, name } = event.target;
    setLoginForm((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }
  const handleClick = () => {
    if (loginError) {
      setOpen(true);
      console.log(loginError);
    } else {
      logMeIn();
    }
  };

  return (
    <>
      <h2 className="d-flex justify-content-center">Please Log In</h2>

      <Box display="flex" justifyContent="center" my="3rem">
        <FormControl>
          <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
            <Alert variant="filled" severity="error">
              Please input a valid email address
            </Alert>
          </Snackbar>
          <Snackbar
            open={loginPassError}
            autoHideDuration={5000}
            onClose={handleClose}
          >
            <Alert variant="filled" severity="error">
              Wrong email or password
            </Alert>
          </Snackbar>
          <Snackbar
            open={notVerifiedError}
            autoHideDuration={5000}
            onClose={handleClose}
          >
            <Alert variant="filled" severity="error">
              Not authorized. Please verify your email
            </Alert>
          </Snackbar>


          <InputLabel sx={{ mx: 2 }}>Enter your email</InputLabel>
          <Input
            onChange={handleChange}
            type="email"
            text={loginForm.email}
            name="email"
            placeholder="email"
            value={loginForm.email}
            sx={{ mx: 2 }}
          />
        </FormControl>

        <FormControl>
          <InputLabel sx={{ mx: 2 }}>Input your password</InputLabel>
          <Input
            onChange={handleChange}
            type="password"
            text={loginForm.password}
            name="password"
            placeholder="password"
            value={loginForm.password}
            sx={{ mx: 2 }}
          />
        </FormControl>
        <Box alignSelf="end" mx="1rem">
          <Button
            variant="contained"
            onClick={() => {
              handleClick();
              console.log('');
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
      <Box display={'grid'} justifyContent={'center'}>
        <h3>Don't have an account?</h3>

        <Link to="/signup" style={{ textDecoration: 'none' }}>
          <Box display={'flex'} justifyContent={'center'}>
            <Button variant="outlined" size="small">
              Signup
            </Button>
          </Box>
        </Link>
      </Box>
    </>
  );
}

export default Login;
