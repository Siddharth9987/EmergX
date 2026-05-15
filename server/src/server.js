require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const companiesRouter = require('./routes/companies');
const reviewsRouter = require('./routes/reviews');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/companies', companiesRouter);
app.use('/api/reviews', reviewsRouter);

// Connect to MongoDB
connectDB();

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Review&RATE API is running' });
});

// Export the app for Vercel
module.exports = app;

// Only listen if not running as a Vercel function
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}
