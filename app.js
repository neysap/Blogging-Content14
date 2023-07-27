const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const router = require('express').Router();
const controllers = require('./controllers');
const { User, Post } = require('./models');


const app = express();
const hbs = exphbs.create({});
const PORT = process.env.PORT || 3001;

// Set up Handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Set up the session with idle session timeout
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 1000 * 60 * 15 }, // Set the session to expire after 15 minutes of inactivity
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use(controllers);

// Handlebars helper to check if the user is logged in

// router.use((req, res, next) => {
//   res.locals.loggedIn = req.session.logged_in;
//   res.locals.username = req.session.username;
//   next();
// });
  

  
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
  
  // Route to edit a post
  app.get('/edit/:id', async (req, res) => {
    try {
      const postId = req.params.id;
      // Fetch the post from the database based on postId and render the edit page
      res.render('editPost', { postId });
    } catch (err) {
      res.status(500).json(err);
    }
  });

// Start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server listening as http://localhost:${PORT}`));
});
