import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleAddProduct = () => {
    navigate('/admin/add-product');
  };

  const handleViewProducts = () => {
    navigate('/admin/products');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="dashboard-actions">
        <button onClick={handleAddProduct} className="action-button">
          Add New Product
        </button>
        <button onClick={handleViewProducts} className="action-button">
          View Products
        </button>
      </div>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Products</h3>
          <p>0</p>
        </div>
        <div className="stat-card">
          <h3>Recent Orders</h3>
          <p>0</p>
        </div>
        <div className="stat-card">
          <h3>Revenue</h3>
          <p>$0</p>
        </div>
      </div>
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;
