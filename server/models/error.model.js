const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const errorSchema = new Schema({
  controller: String,
  method: String,
  message: String,
  time: { type: String, default: new Date() },
});

const ErrorLog = mongoose.model("Error", errorSchema);

module.exports = ErrorLog;
