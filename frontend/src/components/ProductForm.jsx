import React, { useState } from 'react';
import { addProduct } from '../api';
import './ProductForm.css';

function ProductForm({ onProductAdded }) {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    price: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Validation
      if (!formData.name.trim()) {
        setMessage('Please enter product name');
        setLoading(false);
        return;
      }

      if (!formData.quantity || formData.quantity <= 0) {
        setMessage('Quantity must be greater than 0');
        setLoading(false);
        return;
      }

      if (formData.price === '' || formData.price < 0) {
        setMessage('Price must be valid');
        setLoading(false);
        return;
      }

      // Add product
      await addProduct({
        name: formData.name.trim(),
        quantity: Number(formData.quantity),
        price: Number(formData.price),
      });

      // Success message
      setMessage('✓ Product added successfully!');

      // Clear form
      setFormData({
        name: '',
        quantity: '',
        price: '',
      });

      // Trigger parent refresh
      onProductAdded();

      // Clear message after 2 seconds
      setTimeout(() => setMessage(''), 2000);
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Laptop"
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="e.g., 5"
            min="1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price ($):</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="e.g., 999.99"
            min="0"
            step="0.01"
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </form>

      {message && (
        <div className={`message ${message.startsWith('✓') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
    </div>
  );
}

export default ProductForm;
