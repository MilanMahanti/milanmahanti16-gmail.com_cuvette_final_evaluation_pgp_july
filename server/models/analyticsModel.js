const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  questionText: {
    type: String,
    required: true,
  },
  quizType: {
    type: String,
    enum: ["qa", "poll"],
    required: true,
  },
  // For QA type quiz
  correctCount: {
    type: Number,
    default: 0,
  },
  incorrectCount: {
    type: Number,
    default: 0,
  },
  // For POLL type quiz
  optionCounts: {
    type: Object,
    default: {},
  },
});

const Analytics = mongoose.model("Analytics", analyticsSchema);

module.exports = Analytics;
