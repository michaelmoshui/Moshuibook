const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

// by images we refer to images and videos
const postSchema = new mongoose.Schema(
  {
    type: {
      type: "string",
      enum: ["profilePicture", "cover", null], // allowable type
      default: null,
    },
    text: {
      type: String,
    },
    images: {
      type: Array,
    },
    user: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    background: {
      type: String,
    },
    comments: [
      {
        comment: {
          type: String,
        },
        image: {
          type: String,
        },
        commentBy: {
          type: ObjectId,
          ref: "User",
        },
        createdAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
