const express = require('express');

const router = express.Router();

const Posts = require('../data/helpers/postDb');

// retrieve all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Posts.get(req.query);
    res.status(201).json(posts);
  } catch (err) {
    res.status(500).json({err: 'There was an error while retrieving posts.'})
  }
})

// create new post
router.post('/', async (req, res) => {
  try {
    const newPost = req.body;
    if (newPost.text && newPost.user_id) {
      const post = await Posts.insert(newPost);
      res.status(201).json({post});
    } else {
      res.status(400).json({err: 'Please provide post content'});
    }
  } catch (err){
    res.status(500).json({err: 'There was an error while adding the post.'});
  }
})

// get individual user by id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Posts.getById(id);
    if (post) {
      res.status(201).json(post);
    } else {
      res.status(404).json({err: 'Post with that ID not found'});
    }
  } catch (error) {
    res.status(500).json({err: "The post could not be retrieved."})
  }
})

// delete post by id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await Posts.remove(id);
    if (posts > 0){
      res.status(200).json({posts});
    } else {
      res.status(404).json({err: 'The post with that id does not exist.'})
    }
  } catch (err) {
    res.status(500).json({err: 'There was an error while deleting post.'})
  }
})
// edit user name
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatePost = req.body;
    const post = await Posts.update(id, updatePost);
    if (post){
      if (updatePost.text){
        res.status(201).json({post});
      } else {
        res.status(400).json({err: 'Please provide updated post name.'});
      }
    } else {
      res.status(404).json({message: "The post with the specified ID does not exist."});
    }
  } catch (err) {
    res.status(500).json({err: 'Error occurred when updating post name'});
  }
})

module.exports = router;