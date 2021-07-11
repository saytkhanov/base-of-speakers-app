const {Schema, model, Types} = require('mongoose');

const speakerSchema = new Schema({
  login: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  category: {
    type: Types.ObjectId,
    ref: "Category"
  }
}, {
  timestamps: true
})

const Speaker = model("Speaker", speakerSchema);

module.exports = Speaker;