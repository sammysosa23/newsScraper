// DEPENDENCIES
var express = require("express");
var mongoose = require("mongoose");
var logger = require("morgan");
// REQUIRE AXIOS AND CHEERIO. THIS MAKES THE SCRAPING POSSIBLE
var axios = require("axios");
var cheerio = require("cheerio");

// REQUIRE ALL MODELS
var db = require("./models");

// CONNECT TO PORT 
var PORT = process.env.PORT || 8080;

// REQUIRE HANDLEBARS
var exphbs = require("express-handlebars");

// INIT EXPRESS
var app = express();

// REQUIRE MIDDLEWARE
// USE MORGAN LOGGER FOR LOGGING REQUESTS 
app.use(logger("dev"));

// HANDLEBARS MIDDLEWARE
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// PARSE PUBLIC A STATIC FOLDER 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MAKE PUBLIC A STATIC FILE
app.use(express.static("public"));

// CONNECT TO MONGO DB - HEROKU DEPLOYMENT
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
// mongoose.connect(MONGODB_URI);

// CONNECT TO MONGODB - LOCAL
mongoose.connect("mongodb://localhost/unit", { useNewUrlParser: true });

app.get("/", function (req, res) {
    db.Article.find({}).then(function (dbArticle) {
        res.render("index", { Articles: dbArticle });
    });
});

// SCRAPE DATA FROM SITE AND PLACE IT INTO THE MONGODB DB
app.get("/scrape", function (req, res) {
    // GRAB THE BODY OF THE HTML W/AXIOS
    axios.get("https://www.aljazeera.com/").then(function (response) {
        var $ = cheerio.load(response.data);
        // var result = [];
        $(".aside-container").each(function (i, element) {

            // NEED TO TEST IF ITS TAB-CONTENT / ASIDE-CONTAINER / TAB-PANE / id: #LATEST
            var result = {};

            var title = $(element).children("a").text();
            var link = $(element).children("a").attr("href");
            // ADD THE TEXT AND HREF OF EVERY LINK, SAVE THEM AS PROPERTIES OF RESULT OBJECT
            // MAYBE USE THIS - - - 
            // $('p.title').each(function (i, element) {
            //     var title = $(this).text();
            //     var link = $(element).children().attr('href');
            // })

            // result.title = $(this)
            //     .children("a")
            //     .text();
            // result.link = $(this)
            //     .children("a")
            //     .attr("href");

            db.Article.create(result)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    console.log(err);
                });
        });
        res.send("Scrape Complete");
        console.log()
    });
});

// POST ROUTE
app.post("/api/:id", function (req, res) {
    // CREATE A COMMENT IN THE DB   
    db.Comment.create(req.body).then(function (dbComment) {
        return db.Article.findOneAndUpdate({}, { $push: { comments: dbComment.id } }, { new: true }).populate("comments")
            .then(function (dbArticle) {
                // IF ARTICLE WAS UPDATED SUCCESSFULLY, SEND IT BACK TO THE CLIENT
                res.json(dbArticle);
            })
            .catch(function (err) {
                // IF ERROR OCCURS, SEND IT BACK TO THE CLIENT
                res.json(err);
            });
    });
});

// STARTING SERVER 

app.listen(PORT, function () {
    console.log("App is running on port " + PORT + "...one step down!");
})