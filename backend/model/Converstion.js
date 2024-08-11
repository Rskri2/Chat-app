const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
    },
    sentBy: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    seen: {
      type: Boolean,
      default: false,
    },
    imageUrl: {
      type: String,
      default: "",
    },
    videoUrl: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const conversationSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    receiver: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    conversations: [
      {
        ref: "Message",
        type: mongoose.Schema.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
  }
);
conversationSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'conversations'
  });
  next();
});
const Message = mongoose.model("Message", messageSchema);
const Conversation = mongoose.model("Conversation", conversationSchema);
module.exports = {
  Message,
  Conversation,
};
