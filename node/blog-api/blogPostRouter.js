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

router.post('/', jsonParser, (req, res) => {
  const requiredFields = ['title', 'content', 'author', 'publishDate'];

  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }

  const newBlogPost = BlogPosts.create(req.body.title, req.body.content, req.body.author, req.body.publishDate);
  res.status(201).json(newBlogPost);
});

router.put('/:id', jsonParser, (req, res) => {
  const requiredFields = ['id', 'title', 'content', 'author', 'publishDate'];

  for (let i = 0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }

  if (req.params.id !== req.body.id) {
    const message = `Request path id (${req.params.id}) and request body id (${req.body.id}) must match`;
    console.error(message);
    return res.status(400).send(message);
  }

  console.log(`Updating blog post \`${req.params.id}\``);
  
  BlogPosts.update({
    id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    publishDate: req.body.publishDate
  });

  res.status(204).end();
});

router.delete('/:id', (req, res) => {
  BlogPosts.delete( req.params.id );
  console.log( `Deleted recipe \`${req.params.ID}\`` );
  res.status( 204 ).end();
});

module.exports = router;