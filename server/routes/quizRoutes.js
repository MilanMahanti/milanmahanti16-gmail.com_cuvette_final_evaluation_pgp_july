const quizController = require("../controllers/quizController");
const authController = require("../controllers/authController");
const express = require("express");
const router = express.Router();

router.get("/stats", authController.protect, quizController.getQuizStats);

router
  .route("/")
  .get(authController.protect, quizController.getAllQuiz)
  .post(authController.protect, quizController.createQuiz);

router
  .route("/:quizId")
  .get(quizController.getQuiz)
  .patch(authController.protect, quizController.editQuiz)
  .delete(authController.protect, quizController.deleteQuiz);

router.post("/:quizId/submit", quizController.submitQuiz);
router.get(
  "/:quizId/analysis",
  authController.protect,
  quizController.getQuestionWiseAnalysis
);

module.exports = router;
