import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const token = localStorage.getItem('authToken');

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <h2>MY-TOKO</h2>
        </div>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/products" className="nav-link">Products</Link>
          {token ? (
            <>
              <Link to="/cart" className="nav-link">Cart</Link>
              <button
                onClick={() => { 
                  localStorage.removeItem('authToken'); 
                  window.location.href = '/'; 
                }}
                className="logout-button"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="nav-link">Login</Link>
          )}
        </div>
      </div>

      <style>{`
        .navbar {
          background-color: #333;
          padding: 15px 30px;
          color: white;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 100;
        }

        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo h2 {
          margin: 0;
          font-size: 1.8rem;
          color: #fff;
        }

        .nav-links {
          display: flex;
          align-items: center;
        }

        .nav-link {
          color: white;
          text-decoration: none;
          margin-right: 20px;
          font-size: 1rem;
          font-weight: 500;
          padding: 10px 15px;
          border-radius: 5px;
          transition: background-color 0.3s;
        }

        .nav-link:hover {
          background-color: #4CAF50;
        }

        .logout-button {
          padding: 10px 20px;
          background-color: #f44336;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s;
        }

        .logout-button:hover {
          background-color: #d32f2f;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
