const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const LikeSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  like: {
    type: Array,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Like = mongoose.model("like", LikeSchema);
