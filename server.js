// DEPENDENCIES
var express = require("express");
var mongoose = require("mongoose");
var logger = require("morgan");
var axios = require("axios");
var cheerio = require("cheeerio");

// REQUIRE ALL MODELS
var db = db = require("./models");

// CONNECT TO PORT 
var PORT = 8080; 

// REQUIRE HANDLEBARS
var exphbs = require("handlebars");

// INIT EXPRESS
var app = express();

// REQUIRE MIDDLEWARE
// USE MORGAN LOGGER FOR LOGGING REQUESTS 
app.use(logger("dev"));
// HANDLEBARS MIDDLEWARE
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

// PARSE PUBLIC A STATIC FOLDER 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MAKE PUBLIC A STATIC FILE
app.use(express.static("public"));

// CONNECT TO MONGO DB
mongoose.connect("mongodb:/localhost/unit", {useNewUrlParser: true });


app.g et("/", function (req, res) {
    db.Article.find({}).then(function (dbArticle) {
        res.render("index", { Articles: dbArticle });
    });
});

// ROUTES FOR ALJAZEERA
app.get("/scrape", function(req, res) {
    // GRAB THE BODY OF THE HTML W/AXIOS
    axios.get("https://www.aljazeera.com/").then(function(response) {
        var $ = cheerio.load(response.data);
        $("latest-news-topic latest-news-topic-link").each(function(i, element) {
            var result = {};


        })
    });
});

app.listen(PORT, function () {
    console.log("App is running on port " + PORT + "...one step down!");
})