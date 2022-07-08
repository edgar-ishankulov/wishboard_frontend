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
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5050';

const Register = ({ token, removeToken }) => {
  const [signUpForm, setSignUpForm] = useState({
    email: '',
    password: '',
  });
  const [signupSuccess, setSignupSuccess] = useState('false');
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [openEmail, setOpenEmail] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenEmail(false);
    setOpenPassword(false);
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  function isValidPassword(password) {
    if (password == undefined || password == null) {
      return false;
    }
    if (password.length < 8) {
      return false;
    }
    return true;
  }

  useEffect(() => {
    function setSuccess() {
      if (signupSuccess === 'true') {
        return navigate('/profile', { replace: true });
      }
    }
    setSuccess();
    setSignupSuccess('false');
  }, [signupSuccess]);

  useEffect(() => {
    function checkForm() {
      if (!isValidEmail(signUpForm.email)) {
        setEmailError('Email is invalid');
      } else {
        setEmailError(null);
      }
    }
    function checkFormPassword() {
      if (!isValidPassword(signUpForm.password)) {
        setPasswordError('Password is invalid');
      } else {
        setPasswordError(null);
      }
    }
    checkForm();
    checkFormPassword();
  }, [signUpForm.email, signUpForm.password]);

  const signMeUp = async (event) => {
    try {
      const res = await axios({
        method: 'POST',
        url: `${API_URL}/signup`,
        data: {
          email: signUpForm.email,
          password: signUpForm.password,
        },
      });
    } catch (error) {
      if (error.response) {
        console.log(error.response);
        console.log(error.response.data);
        console.log(error.response.headers);
      }
    }
    setSignUpForm({
      email: '',
      password: '',
    });
    setSignupSuccess('true');
    event.preventDefault();
  };

  function handleChange(event) {
    const { value, name } = event.target;
    setSignUpForm((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }
  const handleClick = () => {
    if (emailError) {
      setOpenEmail(true);
    } else if (passwordError) {
      setOpenPassword(true);
    } else {
      signMeUp();
    }
  };
  return (
    <>
      <Header removeToken={removeToken} token={token} />
      <h2 className="d-flex justify-content-center">Please Sign Up</h2>
      {token ? (
        <h1> "You're Already Signed In"</h1>
      ) : (
        <Box display="flex" justifyContent="center" my="3rem">
          <FormControl>
            <Snackbar
              open={openEmail}
              autoHideDuration={5000}
              onClose={handleClose}
            >
              <Alert variant="filled" severity="error">
                Please enter a valid email
              </Alert>
            </Snackbar>
            <Snackbar
              open={openPassword}
              autoHideDuration={5000}
              onClose={handleClose}
            >
              <Alert variant="filled" severity="error">
                Password must be at least 8 characters long
              </Alert>
            </Snackbar>
            <InputLabel sx={{ mx: 2 }}>Enter your email</InputLabel>
            <Input
              onChange={handleChange}
              type="email"
              text={signUpForm.email}
              name="email"
              placeholder="email"
              value={signUpForm.email}
              sx={{ mx: 2 }}
            />
          </FormControl>

          <FormControl>
            <InputLabel sx={{ mx: 2 }}>Input your password</InputLabel>
            <Input
              onChange={handleChange}
              type="password"
              text={signUpForm.password}
              name="password"
              placeholder="password"
              value={signUpForm.password}
              sx={{ mx: 2 }}
            />
          </FormControl>
          <Box alignSelf="end" mx="1rem">
            <Button variant="contained" onClick={handleClick}>
              Submit
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Register;
