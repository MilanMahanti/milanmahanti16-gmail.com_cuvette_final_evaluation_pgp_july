const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  text: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
});

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: [true, "Question text can not be empty"],
  },
  optionType: {
    type: String,
    enum: ["text", "image", "both"],
    required: true,
  },
  options: {
    type: [optionSchema],
    validate: {
      validator: function (options) {
        return options.length >= 2 && options.length <= 4;
      },
      message: "Options count must be between 2 and 4.",
    },
  },
  answer: {
    type: {
      text: String,
      imageUrl: String,
    },
    required: function () {
      return this.optionType === "qa";
    },
  },
});

const quizSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User id required."],
    },
    title: {
      type: String,
      required: [true, "Quiz needs to have a title."],
    },
    type: {
      type: String,
      enum: ["poll", "qa"],
      required: true,
    },
    questions: {
      type: [questionSchema],
      validate: {
        validator: function (questions) {
          return questions.length >= 1 && questions.length <= 5;
        },
        message: "Question count must be between 1 and 5.",
      },
    },
    impressions: {
      type: Number,
      default: 0,
    },
    timer: {
      type: Number,
      min: 0,
      default: 0,
    },
    shareableLink: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

quizSchema.methods.incrementImpressions = async function () {
  this.impressions += 1;
  await this.save();
};

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
