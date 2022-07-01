import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Search from './components/Search';
import ImageCard from './components/ImageCard';
import Welcome from './components/Welcome';
import Wishboard from './pages/Wishboard';
import App from './App';

const Router = () => {

    return (
        <Routes>
        <Route path="/" element={<App /> } />
        <Route path="/wishboard" element={<Wishboard />} />
  </Routes>
    )



}

export default Router