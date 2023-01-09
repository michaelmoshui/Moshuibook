const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const codeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  // this field contains user id
  user: {
    type: ObjectId,
    ref: "user",
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Code", codeSchema);
