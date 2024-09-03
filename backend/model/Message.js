const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      default:""
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
    },
    receiver:{
      type: mongoose.Schema.Types.ObjectId, 
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

const Message = mongoose.model("Message", messageSchema);
module.exports = {
  Message,
};