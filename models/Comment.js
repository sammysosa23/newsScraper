var mongoose = require('mongoose');

// SAVE A REFERENCE TO THE SCHEMA CONSTRUCTOR
var Schema = mongoose.Schema;

// USING THE SCHEMA CONSTRUCTOR CREATE A NEW COMMENT SCHEMA OBJECT
// SIMILAR TO THE SEQUALIZE MODEL
var CommentSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  comments: {
    type: String,
    required: true
  }
});

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;