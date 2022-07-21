import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  Input,
  Button,
  Box,
  Snackbar,
  Alert,
  Container,
} from '@mui/material';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { verificationEmail } from '../redux/verificationEmailSlice';
import { accExists } from '../redux/accExistsSlice';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5050';

const Register = ({ token, removeToken }) => {
  const [signUpForm, setSignUpForm] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [signupSuccess, setSignupSuccess] = useState('false');
  const navigate = useNavigate();
  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [openName, setOpenName] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const verificationEmailSent = useSelector(
    (state) => state.verificationEmail.verificationEmail
  );
  const dispatch = useDispatch();
  const accExistsState = useSelector((state) => state.accExists.accExists);

  const handleCloseReg = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenName(false)
    setOpenEmail(false);
    setOpenPassword(false);
  };
  function isValidName(name) {
    if (name == undefined || name == null) {
      return false;
    }
    if (name.length < 1) {
      return false;
    }
    return true;
  }
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
    function checkFormName() {
      if (!isValidName(signUpForm.name)) {
        setNameError('Name is invalid');
      } else {
        setNameError(null);
      }
    }
    function checkFormEmail() {
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
    checkFormName();
    checkFormEmail();
    checkFormPassword();
  }, [signUpForm.email, signUpForm.password, signUpForm.name]);

  const signMeUp = async (event) => {
    try {
      const res = await axios({
        method: 'POST',
        url: `${API_URL}/signup`,
        data: {
          name: signUpForm.name,
          email: signUpForm.email,
          password: signUpForm.password,
        },
      });
      dispatch(verificationEmail(true));
      setSignUpForm({
        name: '',
        email: '',
        password: '',
      });
      setSignupSuccess('true');
    } catch (error) {
      if (error.response.status == 403) {
        dispatch(accExists(true));
        navigate('/profile');
        console.log(accExistsState);
        console.log(error.response.data);
        console.log(error.response.headers);
      }
    }
    // event.preventDefault();
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
    } 
    else if (nameError) {
      setOpenName(true)
    }
    else {
      signMeUp();
    }
  };
  return (
    <>
      <Header removeToken={removeToken} token={token} />
      {token ? (
        <Container className='d-flex justify-content-center'>

          <h2> "You're Already Signed In"</h2>
        </Container>
      ) : (
        <>
        <h2 className="d-flex justify-content-center my-5">Please Sign Up</h2>
          <Container className="d-flex justify-content-center my-3">
            <FormControl sx={{ width: 400 }}>
            <Snackbar
                open={openName}
                autoHideDuration={4000}
                onClose={handleCloseReg}
              >
                <Alert variant="filled" severity="error">
                  Name must not be empty
                </Alert>
              </Snackbar>
              <Snackbar
                open={openEmail}
                autoHideDuration={4000}
                onClose={handleCloseReg}
              >
                <Alert variant="filled" severity="error">
                  Please enter a valid email
                </Alert>
              </Snackbar>
              <Snackbar
                open={openPassword}
                autoHideDuration={4000}
                onClose={handleCloseReg}
              >
                <Alert variant="filled" severity="error">
                  Password must be at least 8 characters long
                </Alert>
              </Snackbar>
              <InputLabel sx={{ mx: 2 }}>Enter your name</InputLabel>
              <OutlinedInput
                required={true}
                label="Enter your name"
                onChange={handleChange}
                type="text"
                text={signUpForm.name}
                name="name"
                placeholder="Name"
                value={signUpForm.name}
                sx={{ mx: 2 }}
              />
            </FormControl>
          </Container>
          <Container className="d-flex justify-content-center my-3">
            <FormControl sx={{ width: 400 }}>
              <InputLabel sx={{ mx: 2 }}>Enter your email</InputLabel>
              <OutlinedInput
                required={true}
                label="Enter your email"
                onChange={handleChange}
                type="email"
                text={signUpForm.email}
                name="email"
                placeholder="email"
                value={signUpForm.email}
                sx={{ mx: 2 }}
              />
            </FormControl>
          </Container>
          <Container className="d-flex justify-content-center my-3">
            <FormControl sx={{ width: 400 }}>
              <InputLabel sx={{ mx: 2 }}>Input your password</InputLabel>
              <OutlinedInput
                label="Input your password"
                required={true}
                onChange={handleChange}
                type="password"
                text={signUpForm.password}
                name="password"
                placeholder="password"
                value={signUpForm.password}
                sx={{ mx: 2 }}
              />
            </FormControl>
          </Container>

          <Container className="d-flex justify-content-center my-3">
            <Button size="small" variant="contained" onClick={handleClick}>
              Submit
            </Button>
          </Container>
        </>
      )}
    </>
  );
};

export default Register;
