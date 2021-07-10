const mongoose = require("mongoose")

const ReviewSchema = mongoose.Schema({
  username: String,
  text: String,
  speaker: {type: mongoose.SchemaTypes.ObjectId, ref: "Speaker"}
}, {timestamps: true})

const Review = mongoose.model("Review", ReviewSchema)

module.exports = Review