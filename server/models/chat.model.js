const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const messageSchema = new Schema({
  users: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
  chats: {
    type: [Message],
    default: [],
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
