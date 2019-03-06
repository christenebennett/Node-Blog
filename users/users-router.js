const express = require('express');

const router = express.Router();

const PostsRouter = require('./posts/posts-router');
const Users = require('../data/helpers/userDb');

router.use(express.json())

const upperCaseName = (req, res, next) => {
  let userName = req.body.name;
  if (userName) {
    req.body.name = userName.toUpperCase();
    next();
  } else {
    next();
  }
}
router.use(upperCaseName)


router.use('/', PostsRouter);

// retrieves list of users
router.get('/', async (req, res) => {
  try {
    const users = await Users.get(req.query);
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({err: "The users could not be retrieved."})
  }
})

// create new user
router.post('/', upperCaseName, upperCaseName , async (req, res) => {
  try {
    const newUser = req.body;
    if (newUser.name) {
      const user = await Users.insert(newUser);
      res.status(201).json({user});
    } else {
      res.status(400).json({err: 'Please provide name of the user'});
    }
  } catch (err){
    res.status(500).json({err: 'There was an error while adding user to the database.'});
  }
})

// get individual user by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const users = await Users.getById(id);
    res.status(201).json(users);
  } catch (error) {
    res.status(500).json({err: "The users could not be retrieved."})
  }
})

// delete user by id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const users = await Users.remove(id);
    if (users > 0){
      res.status(200).json({users});
    } else {
      res.status(404).json({err: 'The user with that id does not exist.'})
    }
  } catch (err) {
    res.status(500).json({err: 'There was an error while deleting user.'})
  }
})
// edit user name
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateUser = req.body;
    const user = await Users.update(id, updateUser);
    if (user){
      if (updateUser.name){
        res.status(201).json({user});
      } else {
        res.status(400).json({err: 'Please provide updated user name.'});
      }
    } else {
      res.status(404).json({message: "The post with the specified ID does not exist."});
    }
  } catch (err) {
    res.status(500).json({err: 'Error occurred when updating user name'});
  }
})

// retrieves user's posts
router.get('/:id/posts', async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await Users.getUserPosts(id);
    res.status(201).json(posts);
  } catch (error) {
    res.status(500).json({err: "The posts could not be retrieved"})
  }
})


module.exports = router;