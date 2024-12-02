import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, selectProducts } from '../redux/productSlice';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector(selectProducts);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('https://fakestoreapi.com/products');
      dispatch(setProducts(response.data));
    };
    fetchProducts();
  }, [dispatch]);

  return (
    <div className="home-container">
      <header className="header">
        <h1 className="home-title">Welcome to MY-TOKO</h1>
        <p className="home-subtitle">Your one-stop shop for all your needs</p>
      </header>

      <div className="product-list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      
      <style>{`
        .home-container {
          padding: 20px;
          background-color: #f4f4f4;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: 'Arial', sans-serif;
        }

        .header {
          text-align: center;
          margin-bottom: 40px;
        }

        .home-title {
          font-size: 3rem;
          font-weight: 800;
          color: #333;
          margin-bottom: 10px;
          letter-spacing: 1.5px;
        }

        .home-subtitle {
          font-size: 1.2rem;
          color: #777;
          font-weight: 400;
          margin-top: 0;
        }

        .product-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          width: 90%;
          max-width: 1200px;
          padding: 10px;
        }

        .product-list .product-card {
          background-color: #fff;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .product-list .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
        }

        .product-card img {
          width: 100%;
          height: auto;
          border-radius: 8px;
          object-fit: cover;
        }

        .product-card .product-title {
          font-size: 1.3rem;
          font-weight: 600;
          color: #333;
          margin-top: 10px;
        }

        .product-card .product-price {
          font-size: 1.1rem;
          color: #e67e22;
          margin-top: 5px;
        }

        .product-card .product-button {
          margin-top: 15px;
          padding: 10px 20px;
          background-color: #27ae60;
          color: #fff;
          border: none;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .product-card .product-button:hover {
          background-color: #2ecc71;
        }
      `}</style>
    </div>
  );
};

export default Home;
