import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice'; 
import axios from 'axios';
import ProductDetailModal from './ProductDetailModal'; 

const ListProduct = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart({ 
      id: product.id, 
      title: product.title, 
      price: product.price, 
      quantity: 1 
    }));
  };

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="product-container">
      <h2 className="product-title">Our Products</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-card" onClick={() => handleOpenModal(product)}>
            <img 
              src={product.image} 
              alt={product.title} 
              className="product-image"
            />
            <div className="product-info">
              <h3 className="product-name">{product.title}</h3>
              <p className="product-price">${product.price}</p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct} 
          onClose={handleCloseModal} 
          onAddToCart={handleAddToCart} 
        />
      )}
      
      {/* CSS Internal */}
      <style>{`
        /* Style tetap dari ListProduct sebelumnya */
        .product-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
        }

        .product-title {
          text-align: center;
          font-size: 2rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 30px;
        }

        .product-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .product-card {
          background-color: #fff;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: all 0.3s ease-in-out;
        }

        .product-card:hover {
          box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
          transform: translateY(-5px);
        }

        .product-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-bottom: 1px solid #eee;
        }

        .product-info {
          padding: 20px;
        }

        .product-name {
          font-size: 1.25rem;
          font-weight: 600;
          color: #333;
          margin: 10px 0;
          height: 50px;
          overflow: hidden;
        }

        .product-price {
          font-size: 1rem;
          color: #e91e63;
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
};

export default ListProduct;
