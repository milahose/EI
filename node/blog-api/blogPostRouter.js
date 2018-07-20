const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

const {BlogPosts} = require('./model');


BlogPosts.create('Object-Oriented JavaScript', 'blog', 'Jason Smith', 'Jan 4, 2016');
BlogPosts.create('Laravel for Dummies', 'blog', 'Danielle Williams', 'July 10, 2017');
BlogPosts.create('Asynchronous Programming with Node.js', 'blog', 'Nicole Davis', 'November 23, 2018');


router.get('/', (req, res) => {
  res.json(BlogPosts.get());
});

router.post('/', (req, res) => {
  console.log('put end point')
  console.log(res.json(req.body))
  // const requiredFields = ['title', 'content', 'author', 'publishDate'];
  // for (let i = 0; i < requiredFields.length; i++) {
  //   const field = requiredFields[i];
  //   if (!(field in req.body)) {
  //     const message = `Missing \`${field}\` in request body`
  //     console.error(message);
  //     return res.status(400).send(message);
  //   }
  // }

  // const newBlogPost = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
  // res.status(201).json(newBlogPost);
});

router.put('/:id', (req, res) => {
	console.log('put end point');
});

router.delete('/:id', (req, res) => {
	console.log('delete end point');
});

module.exports = router;