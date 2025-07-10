import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminAddProduct from './pages/AdminAddProduct';
import AdminAddCategory from './pages/AdminAddCategory';

function App() {
  const isLoggedIn = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  const ProtectedRoute = ({ element }) => {
    return isLoggedIn && userRole === 'admin' ? element : <Navigate to="/admin/login" />;
  };

  return (
    <Router>
      <Routes>
        {/* Public route */}
        <Route path="/admin/login" element={<LoginPage />} />

        {/* Protected admin-only routes */}
        <Route path="/admin/add-product" element={<ProtectedRoute element={<AdminAddProduct />} />} />
        <Route path="/admin/add-category" element={<ProtectedRoute element={<AdminAddCategory />} />} />

        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/admin/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
