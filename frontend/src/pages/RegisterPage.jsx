import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'customer'
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        ...formData
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('role', res.data.user.role);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      if (formData.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/customer/dashboard');
      }
      setMessage('Registration successful!');
    } catch (err) {
      setMessage('Registration failed: ' + (err.response?.data?.message || 'Error occurred'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Register Account</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label>Full Name</label>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input 
            type="password" 
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input 
            type="password" 
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label>Role</label>
          <select 
            name="role"
            value={formData.role}
            onChange={handleChange}
            disabled={loading}
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button 
          type="submit" 
          className="register-button"
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
        {message && <p className={message.includes('❌') ? 'error-message' : 'success-message'}>{message}</p>}
      </form>
      <p>
        Already have an account?{' '}
        <a href="/login">Login here</a>
      </p>
    </div>
  );
};

export default RegisterPage;
