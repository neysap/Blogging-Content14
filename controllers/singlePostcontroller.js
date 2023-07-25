const express = require('express');
const router = express.Router();
const { Post, Comment, User } = require('../models');

// Route to view a single blog post and its comments
router.get('/post/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, include: [{ model: User, attributes: ['username'] }] },
      ],
    });

    if (!post) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }

    res.render('post', { loggedIn: req.session.logged_in, post });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route to leave a comment on a blog post
router.post('/comment', async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.status(403).json({ message: 'You must be logged in to leave a comment' });
      return;
    }

    const { comment_text, post_id } = req.body;
    const newComment = await Comment.create({
      comment_text,
      user_id: req.session.user_id,
      post_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;