const mongoose = require("mongoose")

const CategorySchema = mongoose.Schema({
  gender: {type: String, required: true}
}, {timestamps: true})

const Category = mongoose.model("Category", CategorySchema)

module.exports = Category