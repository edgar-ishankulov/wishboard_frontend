import { useState } from 'react';
import axios from 'axios';
import { FormControl, InputLabel, Input, Button, Box } from '@mui/material';
import useToken from './UseToken';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5050';

function Login({ token, setToken }) {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

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
      console.log(res.data.access_token);
      setToken(res.data.access_token);
    } catch {
      (error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.data);
          console.log(error.response.headers);
        }
      };
    }

    setLoginForm({
      email: '',
      password: '',
    });

    event.preventDefault();
  };
  function handleChange(event) {
    const { value, name } = event.target;
    setLoginForm((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  return (
    <Box display="flex" justifyContent="center" my="3rem">
      <FormControl>
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
        <Button variant="contained" onClick={logMeIn}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default Login;
