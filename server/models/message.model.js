const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const messageSchema = new Schema({
  sender: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  receiver: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    default: null,
  },
  receipt: {
    type: Number,
    default: 0,
    required: true,
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
