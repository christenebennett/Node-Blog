const express = require('express');

const server = express();

server.get('/', (req, res) => {
  res.send(`
    <h1>Node Blog API</h1>
    <p>Welcome to the Node Blog API</p>
  `)
})

module.exports = server;