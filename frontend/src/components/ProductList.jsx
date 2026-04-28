import React from 'react';
import { deleteProduct } from '../api';
import './ProductList.css';

function ProductList({ products, onProductDeleted }) {
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        onProductDeleted();
      } catch (error) {
        alert('Error deleting product: ' + error.message);
      }
    }
  };

  const calculateSubtotal = (quantity, price) => {
    return (quantity * price).toFixed(2);
  };

  const calculateGrandTotal = () => {
    return products.reduce((total, product) => {
      return total + product.quantity * product.price;
    }, 0).toFixed(2);
  };

  if (products.length === 0) {
    return (
      <div className="list-container">
        <h2>Products</h2>
        <p className="empty-message">No products yet. Add one above!</p>
      </div>
    );
  }

  return (
    <div className="list-container">
      <h2>Products ({products.length})</h2>
      <table className="products-table">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Subtotal</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td className="center">{product.quantity}</td>
              <td className="right">${product.price.toFixed(2)}</td>
              <td className="right">${calculateSubtotal(product.quantity, product.price)}</td>
              <td className="center">
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="grand-total">
        <strong>Grand Total: ${calculateGrandTotal()}</strong>
      </div>
    </div>
  );
}

export default ProductList;
