import React from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerDashboard = () => {
  const navigate = useNavigate();

  const handleViewProducts = () => {
    navigate('/products');
  };

  const handleViewWishlist = () => {
    navigate('/wishlist');
  };

  const handleViewCart = () => {
    navigate('/cart');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="customer-dashboard">
      <h2>Customer Dashboard</h2>
      <div className="dashboard-actions">
        <button onClick={handleViewProducts} className="action-button">
          Browse Products
        </button>
        <button onClick={handleViewWishlist} className="action-button">
          My Wishlist
        </button>
        <button onClick={handleViewCart} className="action-button">
          My Cart
        </button>
      </div>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Items in Cart</h3>
          <p>0</p>
        </div>
        <div className="stat-card">
          <h3>Wishlist Items</h3>
          <p>0</p>
        </div>
        <div className="stat-card">
          <h3>Total Orders</h3>
          <p>0</p>
        </div>
      </div>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default CustomerDashboard;
