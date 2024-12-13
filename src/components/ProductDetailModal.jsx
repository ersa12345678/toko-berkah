import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const ProductDetailModal = ({ product, onClose }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    onClose(); 
  };

  return (
    <div className="modal-overlay d-flex justify-content-center align-items-center position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style={{ zIndex: 1000 }}>
      <div className="modal-content bg-white p-4 rounded shadow" style={{ width: '400px', maxHeight: '80vh', overflowY: 'auto' }}>
        <button className="close-button btn btn-link position-absolute top-0 end-0" onClick={onClose}>X</button>
        <img src={product.image} alt={product.title} className="img-fluid mb-3" />
        <h2 className="h5 mb-2">{product.title}</h2>
        <p className="text-muted mb-2">{product.description}</p>
        <p className="h6 mb-3">Price: ${product.price}</p>
        <button className="add-to-cart-button btn btn-success" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetailModal;