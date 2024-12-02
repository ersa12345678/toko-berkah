import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import ListProduct from './components/ListProduct';
import CartPage from './components/CartPage';
import Navbar from './components/Navbar';
import Home from './pages/Home'; 
import Footer from './components/Footer';


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<ListProduct />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
      <Footer /> 
    </Router>
  );
};

export default App;
