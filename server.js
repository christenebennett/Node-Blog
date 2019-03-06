const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const UsersRouter = require('./users/users-router');
const PostsRouter = require('./posts/posts-router');

const server = express();
const parser = express.json();
const securityMiddleware = helmet();
const logMiddleware = logger('dev');

server.use(parser, securityMiddleware, cors(), logMiddleware)
server.use('/api/users', UsersRouter);
server.use('/api/posts', PostsRouter);

server.get('/', (req, res) => {
  res.send(`
    <h1>Node Blog API</h1>
    <p>Welcome to the Node Blog API</p>
  `)
})

module.exports = server;