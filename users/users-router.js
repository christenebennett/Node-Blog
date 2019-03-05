const express = require('express');

const router = express.Router();

const Users = require('../data/seeds/02-users');

router.get('/', async (req, res) => {
  try {
    const users = await Users.get();
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({err: "The users could not be retrieved."})
  }
})

module.exports = router;