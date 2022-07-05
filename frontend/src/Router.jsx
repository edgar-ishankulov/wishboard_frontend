import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Profile from './components/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import App from './App';
import Wishboard from './pages/Wishboard';
import useToken from './components/UseToken';

const Router = () => {
  const { token, removeToken, setToken } = useToken();

  return (
    <Routes>
      <Route path="/" element={<App token={token} setToken={setToken} />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route path="/signup" element={<Register token={token} removeToken={removeToken} />} />
      <Route path="/wishboard" element={<Profile />} />
    </Routes>
  );
};

export default Router;
