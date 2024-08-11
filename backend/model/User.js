const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true
    },
    password: {
      type: String,
      select: false,
    },
    passwordConfirm: {
      type: String,
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Password don't match",
      },
    },
    photo: {
      type: String,
      default: ""
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
userSchema.pre("save", async function (next) {
  if(this.password){
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = null;
  }
});


const User = mongoose.model("User", userSchema);

module.exports = User;