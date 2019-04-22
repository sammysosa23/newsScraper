// DEPENDENCIES
var mongoose = require("mongoose");
var logger = require("morgan");
var bodyParser = require("body-parser");

// EXPRESS APP INIT
var express = require("express");
var app = express();

var routes = require("./controller/controller.js");
app.use("/", routes);

app.use(express.static(process.cwd() + "/public"));

// REQUIRE HANDLEBARS
var exphbs = require("express-handlebars");
// HANDLEBARS MIDDLEWARE
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// REQUIRE MIDDLEWARE
// USE MORGAN LOGGER FOR LOGGING REQUESTS 
app.use(logger("dev"));

// PARSE PUBLIC A STATIC FOLDER 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// MAKE PUBLIC A STATIC FILE
app.use(express.static("public"));

// CONNECT TO MONGO DB - HEROKU DEPLOYMENT
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoScrapedNews";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

var db = mongoose.connection;
db.on("Error", console.error.bind(console, "Connection Error:"));
db.once("Open", function () {
    console.log("Connected to Mongoose");
});

// CONNECT TO MONGODB - LOCAL
// mongoose.connect("mongodb://localhost/mongoScrapedNews", { useNewUrlParser: true });

// CONNECT TO PORT 
var PORT = process.env.PORT || 8181;
// STARTING SERVER 
app.listen(PORT, function () {
    console.log("App is running on port " + PORT + "...one step down!");
});
