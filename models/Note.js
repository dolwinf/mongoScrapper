var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var Noteschema = new Schema({
  note: String
});

var Note = mongoose.model("Note", Noteschema);
module.exports = Note;
