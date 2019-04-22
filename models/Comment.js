// REQUIRE MONGOOSE
var mongoose = require("mongoose");

// REFERENCE TO SCHEMA CONSTRUCTOR
var Schema = mongoose.Schema;
// CREATE COMMENT SCHEMA
var CommentSchema = new Schema({
  name: {
    type: String
  },
  body: {
    type: String,
    required: true
  }
});
// CREATE THE COMMENT WITH THE COMMENT SCHEMA
var Comment = mongoose.model("Comment", CommentSchema);
// EXPORT THE MODEL
module.exports = Comment;
