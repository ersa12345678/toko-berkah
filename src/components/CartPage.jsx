import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateQuantity, removeFromCart } from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [paymentMethod, setPaymentMethod] = useState('');

  const handleQuantityChange = (id, quantity) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const handleCheckout = () => {
    if (!paymentMethod) {
      alert('Silakan pilih metode pembayaran sebelum melanjutkan.');
      return;
    }
    
    alert(`Terimakasih sudah berbelanja, pesananmu sedang kami proses dengan metode pembayaran: ${paymentMethod}.`);
    navigate('/');
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mt-5" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
      {/* Spacer to push title down */}
      <div className="mb-4"></div>
      <h2 className="text-center mb-4">Keranjang KU</h2>
      {cartItems.length === 0 ? (
        <p className="text-center text-muted">Yuk... Pilih Produk Yang Kamu Mau.</p>
      ) : (
        <ul className="list-unstyled">
          {cartItems.map((item) => (
            <li key={item.id} className="d-flex justify-content-between align-items-center bg-light p-3 mb-2 rounded shadow-sm">
              <img src={item.image} alt={item.title} className="img-fluid" style={{ width: '80px', height: '80px', objectFit: 'cover', marginRight: '15px' }} />
              <div className="flex-grow-1 d-flex flex-column">
                <span className="font-weight-bold">{item.title}</span>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                  className="form-control w-25 mt-2"
                />
                <span className="text-muted mt-2">
                  Total: ${item.price * item.quantity}
                </span>
              </div>
              <button 
                onClick={() => handleRemoveItem(item.id)} 
                className="btn btn-danger ml-2"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
      {cartItems.length > 0 && (
        <div className="mt-4">
          <h5>Total Belanja: <span className="text-success">${totalPrice.toFixed(2)}</span></h5> 
          
          <div className="mt-3">
            <h6>Pilih Metode Pembayaran:</h6>
            <select 
              value={paymentMethod} 
              onChange={(e) => setPaymentMethod(e.target.value)} 
              className="form-control"
            >
              <option value="">-- Pilih Metode Pembayaran --</option>
              <option value="Gopay">Gopay</option>
              <option value="OVO">OVO</option>
              <option value="LinkAja">Link Aja</option>
              <option value="Dana">Dana</option>
            </select>
          </div>

          <div className="mt-4">
            <button 
              onClick={handleCheckout} 
              className="btn btn-success btn-block"
              disabled={!paymentMethod} 
            >
              Beli Sekarang
            </button>
          </div>
        </div>
      )}
      
      <div className="mt-5"></div>
    </div>
  );
};

export default CartPage;