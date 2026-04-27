require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const dns = require("dns");
dns.setServers(["0.0.0.0", "8.8.8.8"]);
// Routes
const itemsRouter = require('./routes/items');
app.use('/api/items', itemsRouter);

// Root Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error('Error connecting to MongoDB:', err));
