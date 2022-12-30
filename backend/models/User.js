const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "first name is required"],
      trim: true, //// lesson: trim removes whitespaces
      text: true,
    },
    lastName: {
      type: String,
      required: [true, "last name is required"],
      trim: true,
      text: true,
    },
    username: {
      type: String,
      required: [true, "username is required"],
      trim: true,
      text: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
    },
    picture: {
      type: String,
      default: "picture",
    },
    cover: {
      type: String,
    },
    gender: {
      type: String,
      required: [true, "gender is required"],
      trim: true,
    },
    bYear: {
      type: Number,
      required: [true, "birth year is required"],
      trim: true,
    },
    bMonth: {
      type: Number,
      required: [true, "birth month is required"],
      trim: true,
    },
    bDay: {
      type: Number,
      required: [true, "birth day is required"],
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    friends: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    followers: {
      type: Array,
      default: [],
    },
    requests: {
      type: Array,
      default: [],
    },
    search: [
      {
        user: {
          type: ObjectId,
          ref: "User",
        },
      },
    ],
    details: {
      bio: {
        type: String,
      },
      otherName: {
        type: String,
      },
      job: {
        type: String,
      },
      workplace: {
        type: String,
      },
      highschool: {
        type: String,
      },
      college: {
        type: String,
      },
      currentCity: {
        type: String,
      },
      hometown: {
        type: String,
      },
      relationship: {
        type: String,
        enum: ["Single", "In a relationship", "Married", "Divorced"], //// lesson: values you're ONLY allowed
      },
      instagram: {
        type: String,
      },
    },
    savedPosts: [
      {
        post: {
          type: ObjectId,
          ref: "Post",
        },
        savedAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  {
    timestamps: true, //// lesson: Mongoose creates two properties of type Date in Schema: createdAt date and updatedAt date
  }
);

module.exports = mongoose.model("User", userSchema);
