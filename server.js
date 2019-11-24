var logger = require("morgan");
var mongoose = require("mongoose");

var cheerio = require("cheerio");
var axios = require("axios");
var express = require("express");
var exphbs = require("express-handlebars");

var app = express();
var PORT = process.env.PORT || 3000;

var db = require("./models");

app.use(express.static("public"));

// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Database configuration
var collections = ["scrapedData"];

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/scrape", function(req, res) {
  axios.get("http://thehackernews.com").then(function(data) {
    $ = cherrio.load(data);
  });
});

//div class="body-post-clear" main div
//a class="story-link"
//div class="clear home-right"
//h2 class="home-title"

app.listen(PORT, function() {
  console.log("Server running on port", PORT);
});
