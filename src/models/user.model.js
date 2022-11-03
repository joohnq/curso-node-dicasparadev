const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: "string",
    required: true,
  },

  lastName: {
    type: "string",
    required: true,
  },

  email: {
    type: "string",
    required: true,
  },

  password: {
    type: "string",
    required: true,
    minlength: 7,
  },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
