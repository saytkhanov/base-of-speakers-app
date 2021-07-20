const { Schema, model, Types } = require("mongoose");

const speakerSchema = new Schema(
  {
    login: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    // rating: [
    //   {
    //     value: Number,
    //     default: 0
    //   }
    // ],
    cost: Number,
    description: String,
    avatar: String,
    gender: {
      type: String,
      enum: ["", "male", "female"],
    },
  },

  {
    timestamps: true,
  }
);

const Speaker = model("Speaker", speakerSchema);

module.exports = Speaker;
