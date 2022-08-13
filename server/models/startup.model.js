const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const startupSchema = new Schema({
  name: { type: String, required: true },
  founded: { type: String, required: true },
  founder: { type: String, required: true },
  domains: { type: [String], default: [] },
});

const Startup = mongoose.model("Error", startupSchema);

module.exports = Startup;
