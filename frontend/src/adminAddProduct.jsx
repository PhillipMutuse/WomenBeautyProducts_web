import React, { useEffect, useState } from 'react';
import axios from 'axios';

const handleLogout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  window.location.href = '/admin/login';
};


const AdminAddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: ''
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch categories from backend
    axios.get('http://localhost:5000/api/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/products/add', product);
      setMessage(res.data.message);
      setProduct({ name: '', description: '', price: '', image: '', category: '' });
    } catch (err) {
      console.error(err);
      setMessage('Failed to add product');
    }
  };

  return (
    <div className="admin-form-container">
      <h2>Add New Product</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Product Name" required />
        <input type="text" name="description" value={product.description} onChange={handleChange} placeholder="Description" />
        <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price" required />
        <input type="text" name="image" value={product.image} onChange={handleChange} placeholder="Image URL" />
        <select name="category" value={product.category} onChange={handleChange} required>
          <option value="">-- Select Category --</option>
          {categories.map(cat => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>
          ))}
        </select>
        <button type="submit">Add Product</button>
        <button onClick={handleLogout} style={{ float: 'right' }}>Logout</button>

      </form>
    </div>
  );
};

export default AdminAddProduct;
