const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const LikeSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Like = mongoose.model("like", LikeSchema);
