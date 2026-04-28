import React, { useState, useEffect } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import { getProducts } from './api';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getProducts();
      setProducts(response.data);
    } catch (err) {
      setError('Failed to fetch products. Make sure backend is running on port 5000.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleProductAdded = () => {
    fetchProducts();
  };

  const handleProductDeleted = () => {
    fetchProducts();
  };

  return (
    <div className="container">
      <header className="header">
        <h1>🏪 Mini Store Management</h1>
        <p>Manage your store inventory easily</p>
      </header>

      <main className="main-content">
        <ProductForm onProductAdded={handleProductAdded} />

        {error && <div className="error-message">{error}</div>}

        {loading ? (
          <div className="loading">Loading products...</div>
        ) : (
          <ProductList products={products} onProductDeleted={handleProductDeleted} />
        )}
      </main>

      <footer className="footer">
        <p>© 2024 Mini Store Management - Keep It Simple</p>
      </footer>
    </div>
  );
}

export default App;
