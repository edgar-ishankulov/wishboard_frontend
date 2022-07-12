import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FormControl,
  InputLabel,
  Input,
  OutlinedInput,
  Button,
  Box,
  Snackbar,
  Alert,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import '../css/custom.css';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import { loginInfoEmail } from '../redux/loginInfoSlice';
import { loginInfoName } from '../redux/loginInfoSlice';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5050';

function Login({ setToken }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const [loginError, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [loginPassError, setLoginPassError] = useState(false);
  const [notVerifiedError, setNotVerifiedError] = useState(false);
  const loginEmail = useSelector((state) => state.loginInfo.email);
  const loginName = useSelector(
    (state) => state.loginInfo.name
  );

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setLoginPassError(false);
    setNotVerifiedError(false);
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
      dispatch(loginInfoEmail(res.data.user.email));
      dispatch(loginInfoName(res.data.user.name));
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
    if (event && event.preventDefault) {
      e.preventDefault();
    }
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

      <Container className="d-flex justify-content-center my-3">
        <FormControl sx={{ width: 400 }}>
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
          <OutlinedInput
            label="Enter your email"
            required={true}
            onChange={handleChange}
            type="email"
            text={loginForm.email}
            name="email"
            placeholder="email"
            value={loginForm.email}
            sx={{ mx: 2 }}
          />
        </FormControl>
      </Container>

      <Container className="d-flex justify-content-center my-3">
        <FormControl sx={{ width: 400 }}>
          <InputLabel sx={{ mx: 2 }}>Input your password</InputLabel>
          <OutlinedInput
            required={true}
            label="Input your password"
            onChange={handleChange}
            type="password"
            text={loginForm.password}
            name="password"
            placeholder="Password"
            value={loginForm.password}
            sx={{ mx: 2 }}
          />
        </FormControl>
      </Container>
      <Container className="d-flex justify-content-center my-3">
        <Button
          type="submit"
          variant="contained"
          size="small"
          onClick={() => {
            handleClick();
          }}
        >
          Submit
        </Button>
      </Container>
      <Container className="d-flex justify-content-center mt-5">
        <h3>Don't have an account?</h3>
      </Container>
      <Container className="d-flex justify-content-center ">
        <Link to="/signup" style={{ textDecoration: 'none' }}>
          <Button variant="outlined" size="small">
            Signup
          </Button>
        </Link>
      </Container>
    </>
  );
}

export default Login;
