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
    <div className="login-container">
      <div className="login-form-container">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleLogin} className="login-form">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          <button type="submit" className="login-button">Login</button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>

      
      <style>{`
        .login-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f2f2f2;
        }

        .login-form-container {
          background-color: #ffffff;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
          text-align: center;
        }

        .login-title {
          font-size: 2rem;
          margin-bottom: 20px;
          color: #333;
        }

        .login-form {
          display: flex;
          flex-direction: column;
        }

        .input-field {
          padding: 12px;
          margin: 10px 0;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-size: 1rem;
          outline: none;
        }

        .input-field:focus {
          border-color: #4CAF50;
          box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
        }

        .login-button {
          padding: 12px;
          margin-top: 15px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1.2rem;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .login-button:hover {
          background-color: #45a049;
        }

        .error-message {
          color: red;
          font-size: 0.9rem;
          margin-top: 15px;
        }
      `}</style>
    </div>
  );
};

export default Login;
