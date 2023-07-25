const express = require('express');
const session = require('express-session');
const path = require('path');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const userController = require('./controllers/userController');
const blogController = require('./controllers/blogController');

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

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

// Handlebars helper to check if the user is logged in
app.use((req, res, next) => {
  res.locals.loggedIn = req.session.logged_in;
  res.locals.username = req.session.username;
  next();
});

// User Authentication Routes
app.use('/api/users', userController);

// Blog Post and Comment Routes
app.use('/api/blog', blogController);

// Test the server
app.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: User, attributes: ['username'] }],
      order: [['createdAt', 'DESC']],
    });
    res.render('homepage', { loggedIn: req.session.logged_in, username: req.session.username, posts });
  } catch (err) {
    res.status(500).json(err);
  }
});


// Start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
});