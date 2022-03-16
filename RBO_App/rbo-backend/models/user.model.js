const mongoose = require("mongoose");
const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"     //model association
      }
    ],
    purchaserequests: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "purchaserequests" //model association
  }],
  })
);
module.exports = User;

