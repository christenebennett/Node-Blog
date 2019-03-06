const express = require('express');
const logger = require('morgan');
const helmet = require('helmet');

const UsersRouter = require('./users/users-router');

const server = express();
const parser = express.json();
const securityMiddleware = helmet();
const logMiddleware = logger('dev');



server.use(parser, securityMiddleware, logMiddleware)
server.use('/api/users', UsersRouter);

server.get('/', (req, res) => {
  res.send(`
    <h1>Node Blog API</h1>
    <p>Welcome to the Node Blog API</p>
  `)
})

module.exports = server;