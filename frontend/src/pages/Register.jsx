import { useState, useEffect } from 'react';
import axios from 'axios';
import { FormControl, InputLabel, Input, Button, Box } from '@mui/material';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5050';

const Register = ({ token, removeToken }) => {
  const [signUpForm, setSignUpForm] = useState({
    email: '',
    password: '',
  });
  const [signupSuccess, setSignupSuccess] = useState("false");
  const navigate = useNavigate();

  useEffect(() => {
      function setSuccess () {
if (signupSuccess === "true") {

    return navigate("/profile", {replace: true})
}
        }
        setSuccess()
        setSignupSuccess("false")
  }, [signupSuccess]);

  const logMeIn = async (event) => {
    try {
      const res = await axios({
        method: 'POST',
        url: `${API_URL}/signup`,
        data: {
          email: signUpForm.email,
          password: signUpForm.password,
        },
      });
    } catch {
      (error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.data);
          console.log(error.response.headers);
        }
      };
    }

    setSignUpForm({
        email: '',
        password: '',
    });
    setSignupSuccess("true");
    event.preventDefault();
  };
  function handleChange(event) {
    const { value, name } = event.target;
    setSignUpForm((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  return (
    <>
      <Header removeToken={removeToken} token={token} />
      <h2 className="d-flex justify-content-center">Please Sign Up</h2>
      {token ? (
        <h1> "You're Already Signed In"</h1>
      ) : (
        <Box display="flex" justifyContent="center" my="3rem">
          <FormControl>
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
            <Button variant="contained" onClick={logMeIn}>
              Submit
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Register;