const express = require('express');
const cors = require('cors'); // to allow frontend requests
const app = express();
const PORT = 5000;

// Enable CORS so frontend can connect
app.use(cors());

// Sample Product Data
const products = [
  { id: 1, name: 'Pro Wireless Headphones', price: 149.99, category: 'Headphones', rating: 4, imageUrl: 'path/to/image1.jpg' },
  { id: 2, name: 'Ultra HD 4K Monitor', price: 399.00, category: 'Monitors', rating: 5, imageUrl: 'path/to/image2.jpg' },
  { id: 3, name: 'Compact Bluetooth Speaker', price: 45.00, category: 'Speakers', rating: 4, imageUrl: 'path/to/image3.jpg' },
  { id: 4, name: 'Gaming Mechanical Keyboard', price: 89.99, category: 'Keyboards', rating: 5, imageUrl: 'path/to/image4.jpg' },
  { id: 5, name: 'Ergonomic Mouse', price: 25.50, category: 'Accessories', rating: 4, imageUrl: 'path/to/image5.jpg' },
  { id: 6, name: 'Portable Power Bank', price: 35.00, category: 'Accessories', rating: 3, imageUrl: 'path/to/image6.jpg' },
  { id: 7, name: 'Noise Cancelling Earbuds', price: 79.99, category: 'Headphones', rating: 5, imageUrl: 'path/to/image7.jpg' },
  { id: 8, name: 'Webcam 1080p', price: 55.00, category: 'Accessories', rating: 4, imageUrl: 'path/to/image8.jpg' },
];

// Routes
app.get('/', (req, res) => {
  res.send('Product API is running');
});

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Get product by ID
app.get('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = products.find(p => p.id === id);

  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running at http://localhost:${PORT}`);
});
