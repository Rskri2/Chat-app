const mongoose = require("mongoose");
const Message = require('./Message')

const User = require('./User')
const conversationSchema = new mongoose.Schema(
  {
    sender: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId, 
    },
    receiver: {
      ref: "User",
      type: mongoose.Schema.Types.ObjectId, 
    },
    msg: [
      {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Message",
      },
    ],
  },
  {
    timestamps: true,
  }
);

conversationSchema.pre(/^find/, function (next) {
  
  this.populate({
    path:'msg'
  }).populate({
    path:'sender'
  }).populate({
    path: 'receiver'
  });
  next();
});


const Conversation = mongoose.model("Conversation", conversationSchema);
module.exports = {
  Conversation,
};
