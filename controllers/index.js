const express = require('express');
const router = express.Router();


const blogController = require('./blogController');
const dashboardController = require('./dashboardController');
const singlePostController = require('./singlePostController');
const userController = require('./userController');

router.use('/users', userController);
router.use('/blog', blogController);
router.use('/dashboard', dashboardController);
router.use('/post', singlePostController);

module.exports = router;



