const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const askSchema = new Schema({
  startupId: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  dilution: {
    type: Number,
    required: true,
  },
  bids: {
    type: [{}],
    default: 0,
  },
});

const Ask = mongoose.model("Ask", askSchema);

module.exports = Ask;
