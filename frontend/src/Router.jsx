import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Profile from './components/Profile';
import App from './App';
import useToken from './components/UseToken';

const Router = () => {
  const { token, removeToken, setToken } = useToken();

  return (
    <Routes>
      <Route path="/" element={<App token={token} setToken={setToken} />} />
      <Route path="/wishboard" element={<Profile />} />
    </Routes>
  );
};

export default Router;
