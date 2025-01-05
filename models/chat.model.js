const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
  chatname: [{ type: String, required: false }],
  participants: [
    { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  ],
  messages: [
    {
      // _id: mongoose.Schema.Types.ObjectId,
      message: { type: String, required: true },
      sentBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      createdAt: {
        type: Date,
        required: true,
        default: Date.now,
      },
    },
  ],

  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
