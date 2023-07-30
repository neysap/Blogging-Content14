# Blogging-Content14

# MVC Tech Blog Challenge

Deployed Heroku Link
https://tech14-ac67275afc4e.herokuapp.com/

## Table of Contents

- [Description](#description)
- [Demo](#demo)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Routes and Controllers](#routes-and-controllers)
- [Models](#models)

## Description

e blog posts, leave comments on This is the MVC Tech Blog Challenge, a full-stack web application that allows users to creatposts, and manage their own posts in a dashboard. It follows the Model-View-Controller (MVC) architectural pattern and uses Node.js, Express.js, Sequelize ORM, and Handlebars templating engine.

## Demo
User Interface
![2023-07-30](https://github.com/neysap/Blogging-Content14/assets/124948553/7ac6894c-08e9-43eb-b84e-4ee4ba5428f8)
Sign-in Error (incorrect user/password)
![2023-07-30 (1)](https://github.com/neysap/Blogging-Content14/assets/124948553/12272d0e-22da-472f-b227-a49080856b2c)



## Technologies Used

List the main technologies and libraries used in the project.

- Node.js
- Express.js
- Sequelize ORM
- Handlebars
- bcrypt
- nodemon

## Installation

To run the application locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/your-repo-name.git`
2. Install the dependencies: `npm install`
3. Set up the database using the provided SQL files or configure the database connection in `config/connection.js`.
4. Start the server: `npm start` or `node server.js`
5. Open your web browser and visit: `http://localhost:3001`

## Routes and Controllers

Describe the main routes and their corresponding controllers in the application. Provide an overview of each route's purpose and functionality.

- `/` - Home route that displays all blog posts.
- `/post/:id` - Route to view a single blog post and its comments.
- `/post` - Route to create a new blog post.
- `/comment` - Route to leave a comment on a blog post.
- `/update-post/:id` - Route to update a blog post.
- `/delete-post/:id` - Route to delete a blog post.
- `/dashboard` - Route to display the user's dashboard.

## Models

Explain the main models used in the application, their relationships, and the key attributes.

- `User` - Represents a registered user. Has a one-to-many relationship with `Post` and `Comment`.
- `Post` - Represents a blog post. Belongs to a `User` and has a one-to-many relationship with `Comment`.
- `Comment` - Represents a comment left on a blog post. Belongs to a `User` and `Post`.
