import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://fakestoreapi.com/auth/login', {
        username: email, 
        password: password,
      });

      const token = response.data.token; 
      localStorage.setItem('authToken', token); 
      setError('');
      alert('Login Berhasil!');
    } catch (error) {
      setError(error.response?.data || 'Gagal login: Periksa email dan password.');
      console.error('Error:', error);
    }
  };

  return (
    <div className="login-container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="login-form-container bg-white p-4 rounded shadow" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="login-title text-center mb-4">Login</h2>
        <form onSubmit={handleLogin} className="login-form d-flex flex-column">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field form-control mb-3"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field form-control mb-3"
          />
          <button type="submit" className="login-button btn btn-success">
            Login
          </button>
        </form>
        {error && <p className="error-message text-danger mt-3">{error}</p>}
      </div>
    </div>
  );
};

export default Login;