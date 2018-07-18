const express = require('express');
const morgan = require('morgan');
const app = express();

const BlogPostRouter = require('./blogPostRouter.js');

app.use(morgan('common'));
app.use('/blog-posts', BlogPostRouter);

app.listen(process.env.PORT || 3001, () => {
  console.log(`Listening on port ${process.env.PORT || 3001}`);
});
