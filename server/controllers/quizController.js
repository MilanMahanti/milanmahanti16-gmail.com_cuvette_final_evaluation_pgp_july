const Quiz = require("../models/quizModel");
const Analytics = require("../models/analyticsModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const mongoose = require("mongoose");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.createQuiz = catchAsync(async (req, res, next) => {
  const { title, type, questions, timer } = req.body;
  const { id: createdBy } = req.user;

  const quiz = await Quiz.create({ createdBy, title, type, questions, timer });
  quiz.shareableLink = quiz.id;
  const newQuiz = await quiz.save();
  res.status(201).json({
    message: "Quiz created successfully.",
    data: {
      newQuiz,
    },
  });
});

exports.getAllQuiz = catchAsync(async (req, res, next) => {
  const quizzes = await Quiz.find({ createdBy: req.user.id }).sort({
    createdAt: -1,
  });
  res.status(200).json({
    message: "Succcessfully fetched all quiz data.",
    data: {
      quizzes,
    },
  });
});

exports.getQuiz = catchAsync(async (req, res, next) => {
  const { quizId } = req.params;
  // const quiz = await Quiz.findById(quizId);
  const quiz = await Quiz.findOne({ _id: quizId });
  // if (req.user.id !== quiz.createdBy.toString())
  //   return next(new AppError("You are not authorized to view this quiz", 403));
  if (!quiz) return next(new AppError(`No quiz found with id ${quizId}.`, 404));
  // await quiz.incrementImpressions();
  res.status(200).json({
    message: "success",
    data: {
      quiz,
    },
  });
});

exports.editQuiz = catchAsync(async (req, res, next) => {
  const { quizId } = req.params;
  const filteredBody = filterObj(req.body, "timer", "questions");
  const quiz = await Quiz.findByIdAndUpdate(quizId, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    message: "Quiz updated Successfully.",
    data: {
      quiz,
    },
  });
});

exports.deleteQuiz = catchAsync(async (req, res, next) => {
  const { quizId } = req.params;
  await Quiz.findByIdAndDelete(quizId);

  res.status(204).json({
    message: "Quiz deleted successfully",
  });
});

exports.getQuizStats = catchAsync(async (req, res, next) => {
  const stats = await Quiz.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(req.user.id),
      },
    },
    {
      $group: {
        _id: null,
        totalQuizzes: { $sum: 1 },
        totalImpressions: { $sum: "$impressions" },
        totalQuestions: { $sum: { $size: "$questions" } },
      },
    },
  ]);
  // if (stats.length === 0) return next(new AppError("No quiz found."));
  const quizStats = {
    totalQuizzes: stats[0]?.totalQuizzes || 0,
    totalImpressions: stats[0]?.totalImpressions || 0,
    totalQuestions: stats[0]?.totalQuestions || 0,
  };
  res.status(200).json({
    message: "success",
    data: {
      quizStats,
    },
  });
});

exports.getQuestionWiseAnalysis = catchAsync(async (req, res, next) => {
  const { quizId } = req.params;

  // Fetch quiz details
  const quiz = await Quiz.findById(quizId);

  if (!quiz) {
    return next(new AppError("Quiz not found", 404));
  }

  // Define default values based on quiz type
  const defaultValues = {
    qa: { correctCount: 0, incorrectCount: 0 },
    poll: { optionCounts: {} },
  };

  // Create an array of default structures for each question
  const defaultAnalysis = quiz.questions.map((question) => {
    const options = {};

    if (quiz.type === "poll" && question.options) {
      question.options.forEach((option) => {
        options[option.text] = 0;
      });
    }

    return {
      questionId: question._id,
      questionText: question.questionText,
      correctCount: defaultValues[quiz.type].correctCount,
      incorrectCount: defaultValues[quiz.type].incorrectCount,
      optionCounts: options,
    };
  });

  // Fetch question-wise analysis from the database
  const questionWiseAnalysis = await Analytics.aggregate([
    {
      $match: { quizId: new mongoose.Types.ObjectId(quizId) },
    },
    {
      $group: {
        _id: {
          questionId: "$questionId",
          questionText: "$questionText",
        },
        correctCount: { $sum: "$correctCount" },
        incorrectCount: { $sum: "$incorrectCount" },
        optionCounts: { $mergeObjects: "$optionCounts" },
      },
    },
    {
      $project: {
        _id: 0,
        questionId: "$_id.questionId",
        questionText: "$_id.questionText",
        correctCount: { $ifNull: ["$correctCount", 0] },
        incorrectCount: { $ifNull: ["$incorrectCount", 0] },
        optionCounts: { $ifNull: ["$optionCounts", {}] },
      },
    },
  ]);

  // Merge the fetched analysis with default values
  const mergedAnalysis = defaultAnalysis.map((defaultItem) => {
    const matchingAnalysis = questionWiseAnalysis.find(
      (item) => item.questionId.toString() === defaultItem.questionId.toString()
    );

    if (matchingAnalysis) {
      return {
        ...defaultItem,
        correctCount: matchingAnalysis.correctCount,
        incorrectCount: matchingAnalysis.incorrectCount,
        optionCounts: matchingAnalysis.optionCounts,
      };
    } else {
      return defaultItem;
    }
  });

  // Get quiz details
  const quizDetails = {
    quizName: quiz.title || null,
    impressionCount: quiz.impressions || 0,
    createdAt: quiz.createdAt || null,
    quizType: quiz.type || null,
  };

  res.status(200).json({
    message: "success",
    data: {
      questionWiseAnalysis: mergedAnalysis,
      quizDetails,
    },
  });
});

exports.submitQuiz = catchAsync(async (req, res, next) => {
  const { quizId } = req.params;
  const { userAnswers } = req.body;
  const quiz = await Quiz.findById(quizId);

  if (!quiz || !userAnswers || userAnswers.length !== quiz.questions.length) {
    return next(new AppError("Invalid quiz or answers.", 400));
  }

  await quiz.incrementImpressions();

  const analyticsUpdates = [];

  const score = userAnswers.reduce((acc, userAnswer, index) => {
    const question = quiz.questions[index];
    const analyticsUpdate = {
      quizId,
      questionId: question._id,
      questionText: question.questionText,
      quizType: quiz.type,
    };

    if (quiz.type === "qa") {
      const isCorrect = compareAnswers(question.answer, userAnswer);
      if (isCorrect) {
        analyticsUpdate.correctCount = 1;
        acc += 1;
      } else {
        analyticsUpdate.incorrectCount = 1;
      }
    } else if (quiz.type === "poll") {
      // For Poll type questions
      const selectedOption = userAnswer._id;

      // Initialize optionCounts if it doesn't exist
      analyticsUpdate.optionCounts = {
        ...quiz.questions[index].options.reduce(
          (options, option) => ({
            ...options,
            [option._id]: 0,
          }),
          {}
        ),
      };

      if (selectedOption) {
        // Increment the existing count or set it to 1 if not present
        analyticsUpdate.optionCounts[selectedOption] += 1;
      }
    }

    analyticsUpdates.push(analyticsUpdate);

    return acc;
  }, 0);

  // Update or insert analytics records
  await Promise.all(
    analyticsUpdates.map(async (update) => {
      const existingAnalytics = await Analytics.findOneAndUpdate(
        {
          quizId: update.quizId,
          questionId: update.questionId,
        },
        {
          $inc: {
            correctCount: update.correctCount || 0,
            incorrectCount: update.incorrectCount || 0,
          },
          $set: {
            quizType: update.quizType,
            questionText: update.questionText,
            optionCounts: update.optionCounts,
          },
        },
        { upsert: true, new: true }
      );
    })
  );

  res.status(200).json({
    message: "success",
    result: score,
    totalQuestion: quiz.questions.length,
  });
});

function compareAnswers(correctAnswer, userAnswer) {
  // Assuming correctAnswer and userAnswer have the structure { text: "", imageUrl: "" }
  if (correctAnswer.text && correctAnswer.imageUrl) {
    // Both text and image option
    return (
      correctAnswer.text.toLowerCase() === userAnswer.text.toLowerCase() &&
      correctAnswer.imageUrl === userAnswer.imageUrl
    );
  } else if (correctAnswer.text) {
    // Text-only option
    return correctAnswer.text.toLowerCase() === userAnswer.text.toLowerCase();
  } else if (correctAnswer.imageUrl) {
    // Image-only option
    return correctAnswer.imageUrl === userAnswer.imageUrl;
  }

  // Handle the case where both text and imageUrl are empty or null
  return true;
}
