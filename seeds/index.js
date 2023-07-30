const { Post, Comment, User } = require('../models');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// force true removes all data and creates tables from the model init schema
sequelize.sync({ force: true }).then(async() => {
    // Create users
    const hashedPassword = await bcrypt.hash("Password123!", 10);
    const user = await User.create({ username:"Test", password: hashedPassword });
    console.log("Seedd!")
    process.exit(1);
});
