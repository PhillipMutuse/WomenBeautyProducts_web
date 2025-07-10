import React, { useState } from 'react';
import axios from 'axios';
const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '/admin/login';
  };
  

const AdminAddCategory = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/categories', { name }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage('✅ Category added!');
      setName('');
    } catch (err) {
      setMessage('❌ Failed to add category');
    }
  };

  return (
    <div className="admin-container">
      <h2>Add Category</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Add</button>
        <button onClick={handleLogout} style={{ float: 'right' }}>Logout</button>

        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default AdminAddCategory;
