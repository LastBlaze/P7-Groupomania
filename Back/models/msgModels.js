const mongoose = require("mongoose");
const User = require("../models/userModel");

const publicationSchema = mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: User, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String },
    likes: { type: Number, default: 0 },
    dislikes: { type: Number, default: 0 },
    usersLiked: { type: [String] },
    usersDisliked: { type: [String] },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("publication", publicationSchema);
