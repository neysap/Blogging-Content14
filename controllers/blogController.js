const express = require('express');
const router = express.Router();
const { Post, Comment, User } = require('../models');

// Homepage route to display all blog posts
router.get('/', async (req, res) => {
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

// Route to display a single blog post and its comments
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

// Route to create a new blog post
router.post('/post', async (req, res) => {
  try {
    if (!req.session.logged_in) {
      res.status(403).json({ message: 'You must be logged in to create a post' });
      return;
    }

    const { title, content } = req.body;
    const newPost = await Post.create({
      title,
      content,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
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

  // Route to update a blog post
router.post('/update-post/:id', async (req, res) => {
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

    res.redirect('/'); // Redirect back to the homepage after successful update
  } catch (err) {
    res.status(500).json(err);
  }
});
  

module.exports = router;