var logger = require("morgan");
var mongoose = require("mongoose");

var cheerio = require("cheerio");
var axios = require("axios");
var express = require("express");
var exphbs = require("express-handlebars");

var app = express();
var PORT = process.env.PORT || 3001;

var db = require("./models");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Database configuration
var collections = ["scrapedData"];
mongoose.connect(
  "mongodb://dolwin:mongo#333@ds249717.mlab.com:49717/mongoscrapper",
  { useNewUrlParser: true }
);

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/scrape", function(req, res) {
  console.log("Api hit");
  axios.get("http://thehackernews.com").then(function(response) {
    var $ = cheerio.load(response.data);

    var result = {};

    var title = $("h2.home-title").text();
    // var link = "div.body-post".children("a.story-link").attr("href");

    result.title = title;
    // result.link = link;
    console.log(result);
    res.send("scrape complete");
  });
});

//div class="body-post-clear" main div
//a class="story-link"
//div class="clear home-right"
//h2 class="home-title"

app.listen(PORT, function() {
  console.log("Server running on port", PORT);
});
