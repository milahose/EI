const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogPostSchema = new Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  author: {
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
  }
});

blogPostSchema.virtual('authorName').get(() => {
  return `${this.author.firstName} ${this.author.lastName}`.trim();
});

blogPostSchema.methods.serialize = function() {
  return {
    id: this._id,
    name: this.name,
    cuisine: this.cuisine,
    borough: this.borough,
    grade: this.grade,
    address: this.addressString
  };
};

const Post = mongoose.model('Post', blogPostSchema);

module.exports = { Post };