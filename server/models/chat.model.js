const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const chatSchema = new Schema({
  users: [{ type: mongoose.SchemaTypes.ObjectId, ref: "User" }],
  chats: {
    type: [Message],
    default: [],
  },
});

const Chat = mongoose.model("Message", chatSchema);

module.exports = Chat;
