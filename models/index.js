const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');

Comment.belongsTo(User, {
    foreignKey: 'user_id',
  });
  
  Comment.belongsTo(Post, {
    foreignKey: 'post_id',
  });

  Post.belongsTo(User, {
    foreignKey: 'user_id',
  });
  
  Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
  });

  User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
  });
  
  User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
  });



module.exports = {
    Comment,
    Post,
    User
}