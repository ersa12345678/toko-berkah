import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleCheckout = () => {
    alert('Terimakasih sudah berbelanja, tunggu sebentar pesananmu masih diantar.');
    navigate('/');
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">My Cart</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart-message">Anda belum memilih item.</p>
      ) : (
        <ul className="cart-list">
          {cartItems.map((item) => (
            <li key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-item-image" />
              <div className="cart-item-details">
                <span className="cart-item-name">{item.title}</span>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  className="cart-item-quantity"
                />
                <span className="cart-item-total-price">
                  Total: ${item.price * item.quantity}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && (
        <button onClick={handleCheckout} className="checkout-button">
          Beli Sekarang
        </button>
      )}

      {/* CSS Internal */}
      <style>{`
        .cart-container {
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 10px;
        }

        .cart-title {
          text-align: center;
          font-size: 2rem;
          font-weight: 600;
          color: #333;
          margin-bottom: 20px;
        }

        .empty-cart-message {
          text-align: center;
          font-size: 1.25rem;
          color: #888;
        }

        .cart-list {
          list-style-type: none;
          padding: 0;
          margin: 0;
        }

        .cart-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px;
          margin-bottom: 10px;
          background-color: #fff;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .cart-item-image {
          width: 80px;
          height: 80px;
          object-fit: cover;
          margin-right: 15px;
        }

        .cart-item-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .cart-item-name {
          font-size: 1.2rem;
          font-weight: 600;
          color: #333;
        }

        .cart-item-quantity {
          width: 60px;
        }

        .cart-item-total-price {
          font-size: 1rem;
          color: #555;
        }

        .checkout-button {
          display: block;
          margin: 20px auto 0;
          padding: 10px 20px;
          background-color: #28a745;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 1rem;
        }

        .checkout-button:hover {
          background-color: #218838;
        }
      `}</style>
    </div>
  );
};

export default CartPage;
