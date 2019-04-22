// REQUIRE MONGOOSE
var mongoose = require("mongoose");
// REFERENCE TO SCHEMA CONSTRUCTOR
var Schema = mongoose.Schema;
// CREATE ARTICLE SCHEMA
var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  comment: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

// CREATE THE ARTICLE WITH THE ARTICLE SCHEMA
var Article = mongoose.model("Article", ArticleSchema);
// EXPORT THE MODEL
module.exports = Article;
