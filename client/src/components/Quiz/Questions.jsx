import { useEffect, useState } from "react";
import { useSubmitQuiz } from "../../queries/useSubmitQuiz";
import { useParams } from "react-router-dom";
import styles from "./Questions.module.css";

function Questions({ quizData, setView, setResult }) {
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(() => {
    // Initialize selectedOption with default options for all questions
    const defaultOptions = {};
    quizData.quiz.questions.forEach((_, index) => {
      defaultOptions[index] = {
        text: "",
        imageUrl: "",
        _id: null,
      };
    });
    return defaultOptions;
  });

  const { quiz } = quizData;
  const [timer, setTimer] = useState(quiz.timer);
  const { submitQuiz, isSubmitting } = useSubmitQuiz();
  const { quizId } = useParams();

  const handelSubmit = () => {
    const userSubmission = Object.values(selectedOption);
    submitQuiz(
      { userSubmission, quizId },
      {
        onSuccess: (data) => {
          setResult(data);
          setView("result");
        },
        onError: (err) => {
          console.log(err);
        },
      }
    );
  };
  const handleNext = () => {
    setSelectedQuestionIndex((prevIndex) => prevIndex + 1);
    setTimer(quiz.timer);
  };

  useEffect(() => {
    if (quiz.timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer === 0) {
            clearInterval(interval);
            if (selectedQuestionIndex < quiz.questions.length - 1) {
              handleNext();
            } else {
              handelSubmit();
            }
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
    return () => {};
    // eslint-disable-next-line
  }, [timer]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <p>
          0{selectedQuestionIndex + 1}/0{quiz.questions.length}
        </p>
        <p className={styles.timer}>00/{timer >= 10 ? timer : `0${timer} `}s</p>
      </div>
      <h1 className={styles.questionText}>
        {quiz.questions[selectedQuestionIndex].questionText}
      </h1>
      <div className={styles.optionsContainer}>
        {quiz.questions[selectedQuestionIndex].options.map((option) => {
          return (
            <div
              key={option?._id}
              onClick={() =>
                setSelectedOption({
                  ...selectedOption,
                  [selectedQuestionIndex]: option,
                })
              }
              className={`${
                option?._id === selectedOption[selectedQuestionIndex]?._id
                  ? styles.active
                  : ""
              } ${styles.option}`}
            >
              {quiz.questions[selectedQuestionIndex].optionType === "text" && (
                <p>{option.text}</p>
              )}
              {quiz.questions[selectedQuestionIndex].optionType === "image" && (
                <img
                  src={option.imageUrl}
                  alt={`option ${selectedQuestionIndex}`}
                />
              )}
              {quiz.questions[selectedQuestionIndex].optionType === "both" && (
                <div className={styles.imageText}>
                  <p>{option.text}</p>
                  <img
                    src={option.imageUrl}
                    alt={`option ${selectedQuestionIndex}`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {quiz.questions.length - 1 > selectedQuestionIndex && (
        <button onClick={handleNext} className="quiz-btn primary">
          Next
        </button>
      )}

      {quiz.questions.length - 1 === selectedQuestionIndex && (
        <button
          onClick={handelSubmit}
          disabled={isSubmitting}
          className="quiz-btn primary"
        >
          {isSubmitting ? "submitting..." : "Submit"}
        </button>
      )}
    </div>
  );
}

export default Questions;
