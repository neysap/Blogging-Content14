const express = require('express');
const router = express.Router();
const { Post } = require('../models');


// Route to display the user's dashboard
router.get('/dashboard', async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.redirect('/signin');
      return;
    }

    const posts = await Post.findAll({
      where: { user_id: req.session.user_id },
      include: [{ model: User, attributes: ['username'] }],
      order: [['createdAt', 'DESC']],
    });

    res.render('dashboard', { loggedIn: req.session.logged_in, username: req.session.username, posts });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to update a blog post
router.put('/post/:id', async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.status(403).json({ message: 'You must be logged in to update a post' });
      return;
    }

    const { title, content } = req.body;
    const updatedPost = await Post.update(
      { title, content },
      { where: { id: req.params.id, user_id: req.session.user_id } }
    );

    if (updatedPost[0] === 0) {
      res.status(404).json({ message: 'No post found with this id or you are not authorized to update this post' });
      return;
    }

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to delete a blog post
router.delete('/post/:id', async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.status(403).json({ message: 'You must be logged in to delete a post' });
      return;
    }

    const deletedPost = await Post.destroy({
      where: { id: req.params.id, user_id: req.session.user_id },
    });

    if (!deletedPost) {
      res.status(404).json({ message: 'No post found with this id or you are not authorized to delete this post' });
      return;
    }

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;