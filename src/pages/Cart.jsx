import React from 'react';
import { useSelector } from 'react-redux';
import { selectCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const cart = useSelector(selectCart);
  const navigate = useNavigate();

  if (cart.length === 0) {
    return <h2>Anda belum memilih item</h2>;
  }

  return (
    <div>
      <h2>My Cart</h2>
      <div>
        {cart.map(item => (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <p>Quantity: {item.quantity}</p>
          </div>
        ))}
      </div>
      <button onClick={() => navigate('/')}>Checkout</button>
    </div>
  );
};

export default Cart;