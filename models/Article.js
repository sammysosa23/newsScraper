var mongoose = require('mongoose');
// var uniqueValidator = require('mongoose-unique-validator')


// SAVE A REFERENCE TO THE SCHEMA CONSTRUCTOR
var Schema = mongoose.Schema;

// 
var ArticleSchema = new Schema({
  // "TITLE" IS REQUIRED AND OF TYPE STRING
  title: {
    type: String,
    required: true
  },
  // "LINK" IS REQUIRED AND OF TYPE STRING
  link: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    required: true
  },
  comments: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }
});

// ArticleSchema.plugin(uniqueValidator);

// CREATED OUR MODEL FROM THE ABOVE SCHEMA - USING MONGOOSE'S MODEL METHOD
var Article = mongoose.model("Article", ArticleSchema);

// EXPORT THE ARTICLE MODEL
module.exports = Article;
