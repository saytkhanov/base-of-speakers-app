const { Schema, model, Types } = require("mongoose");

const voiceSchema = new Schema({
    name: String,
    audio: String,
    speaker: {
      type: Types.ObjectId,
      ref: "Speaker",
    },
  },
  {
    timestamps: true,
  }
);

const Voice = model("Voice", voiceSchema);

module.exports = Voice;
