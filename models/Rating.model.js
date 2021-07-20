const mongoose = require("mongoose");

const RatingSchema = mongoose.Schema(
  {
    speaker: { type: mongoose.SchemaTypes.ObjectId, ref: "Speaker" },
    rating: {type: Number, default: 0}
  },
  { timestamps: true }
);

const Rating = mongoose.model("Rating", RatingSchema);

module.exports = Rating;
