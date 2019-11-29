var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Articleschema = new Schema({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  summary: {
    type: String,
    default: "Summary unavailable."
  },

  issaved: {
    type: Boolean,
    default: false
  },

  created: {
    type: Date,
    default: Date.now
  },
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Note"
    }
  ]
});

var Article = mongoose.model("Article", Articleschema);
module.exports = Article;
