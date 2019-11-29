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

mongoose.connect(
  "mongodb://dolwin:mongo#333@ds249717.mlab.com:49717/mongoscrapper",
  { useNewUrlParser: true }
);

app.get("/", function(req, res) {
  res.render("index");
});

app.get("/scrape", function(req, res) {
  db.Article.deleteMany({}).then(function() {
    axios.get("http://thehackernews.com").then(function(response) {
      var $ = cheerio.load(response.data);

      $("div.body-post").each(function(i, item) {
        var result = {};
        var link = $(this)
          .children("a")
          .attr("href");

        var summary = $(this)
          .children("a")
          .children("div.home-post-box")
          .children("div.home-right")
          .children("div.home-desc")
          .text();

        var title = $(this)
          .children("a")
          .children("div.home-post-box")
          .children("div.home-right")
          .children("h2.home-title")
          .text();

        result.summary = summary;
        result.link = link;
        result.title = title;

        db.Article.create(result).then(function(data) {
          console.log(data);
        });
      });
    });
  });
  res.json("Done");
});

app.get("/articles", function(req, res) {
  db.Article.find({})
    .populate("note")
    .then(data => res.json(data));
});

app.post("/delete/:id", function(req, res) {
  db.Article.deleteOne({ _id: req.params.id }).then(function(data) {
    res.end();
  });
});

app.post("/removesaved/:id", function(req, res) {
  db.Article.findByIdAndUpdate({ _id: req.params.id }, { issaved: false }).then(
    function(data) {
      res.end();
    }
  );
});

app.get("/saved", function(req, res) {
  db.Article.find({ issaved: true })
    .populate("note")
    .then(function(data) {
      res.json(data);
    });
});
app.post("/saved/:id", function(req, res) {
  db.Article.findByIdAndUpdate({ _id: req.params.id }, { issaved: true }).then(
    function() {
      res.send("Saved articles");
    }
  );
});
app.listen(PORT, function() {
  console.log("Server running on port", PORT);
});
