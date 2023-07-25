const express = require('express');
const session = require('express-session');
const path = require('path');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set up the session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

// Test the server
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});