const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MessageSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    user1: {
      type: String,
      required: true,
    },
    user2: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);