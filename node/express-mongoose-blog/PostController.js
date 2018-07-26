const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Post = require('/postSchema');

mongoose.Promise = global.Promise;

app.use(bodyParser.json());

module.exports = {
  findAll(req, res) {
    
  }
}