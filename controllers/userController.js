const express = require('express');
const router = express.Router();
const { User } = require('../models');
const bcrypt = require('bcrypt');

// Sign-up route
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ username, password: hashedPassword });

    req.session.save(() => {
      req.session.logged_in = true;
      req.session.username = user.username;
      res.status(200).json(user);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Sign-in route
router.post('/signin', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });

    if (!user || !await bcrypt.compare(password, user.password)) {
      res.status(401).json({ message: 'Incorrect username or password' });
      return;
    }

    req.session.save(() => {
      req.session.logged_in = true;
      req.session.username = user.username;
      res.status(200).json(user);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Logout route
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;