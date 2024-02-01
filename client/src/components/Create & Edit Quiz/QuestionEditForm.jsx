import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { CiCirclePlus } from "react-icons/ci";
import { IoIosClose } from "react-icons/io";

import styles from "./QuestionsForm.module.css";

import { optionTypes } from "../../utils/helpers";

import { useSingleQuiz } from "../../queries/useSingleQuiz";
import Loading from "../Loading";
import Error from "../Error";
import { useEditQuiz } from "../../queries/useEditQuiz";

const initialQuestion = {
  questionText: "",
  optionType: "text",
  options: [
    { text: "", imageUrl: "" },
    { text: "", imageUrl: "" },
  ],
  answer: { text: null, imageUrl: null },
};

function QuestionEditForm() {
  const { isLoading, error, quizData } = useSingleQuiz();
  const { isEditing, editQuiz } = useEditQuiz();
  const quiz = quizData?.quiz;
  const { quizId } = useParams();

  const [timer, setTimer] = useState(0);
  const [qaType, setQaType] = useState(false);
  const [questions, setQuestions] = useState([initialQuestion]);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (quiz) {
      setTimer(quiz?.timer);
      setQaType(quiz?.type === "qa");
      setQuestions(quiz?.questions);
    }
  }, [quiz]);

  if (isLoading) return <Loading />;
  if (error) return <Error error={error} />;

  const updateQuestions = (callback) => {
    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      callback(updatedQuestions);
      return updatedQuestions;
    });
  };

  const handleQuestionTextChange = (e, index) => {
    updateQuestions((updatedQuestions) => {
      updatedQuestions[index].questionText = e.target.value;
    });
  };

  const handleOptionTypeChange = (e, index) => {
    updateQuestions((updatedQuestions) => {
      const currentQuestion = { ...updatedQuestions[index] };
      const newQuestionType = e.target.value;

      // Reset the options based on the new questionType
      currentQuestion.options = [
        { text: "", imageUrl: "" },
        { text: "", imageUrl: "" },
      ];

      // Set the default answer to null
      currentQuestion.answer = { text: null, imageUrl: null };

      // Update the questionType
      currentQuestion.optionType = newQuestionType;

      // Update the question in the array
      updatedQuestions[index] = currentQuestion;
    });
  };

  const handleChangeOption = (questionIndex, optionIndex, optionType, e) => {
    updateQuestions((updatedQuestions) => {
      const currentQuestion = { ...updatedQuestions[questionIndex] };

      if (optionType === "text") {
        currentQuestion.options[optionIndex] = {
          ...currentQuestion.options[optionIndex],
          text: e.target.value,
        };
      } else if (optionType === "image") {
        currentQuestion.options[optionIndex] = {
          ...currentQuestion.options[optionIndex],
          imageUrl: e.target.value,
        };
      } else if (optionType === "both") {
        currentQuestion.options[optionIndex] = {
          text: e.target.value,
          imageUrl: "",
        };
      }

      updatedQuestions[questionIndex] = currentQuestion;
    });
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleContinue = async () => {
    const data = {
      timer,
      questions,
    };
    editQuiz(
      { data, quizId },
      {
        onSuccess: () => {
          navigate("/dashboard");
        },
      }
    );
  };

  const handelAddQuestion = () => {
    if (questions.length < 5) {
      setQuestions((prevQuestions) => [
        ...prevQuestions,
        {
          questionText: "",
          optionType: "text",
          options: [
            { text: "", imageUrl: "" },
            { text: "", imageUrl: "" },
          ],
          answer: { text: null, imageUrl: null },
        },
      ]);
      setSelectedQuestionIndex(questions.length);
    }
  };

  const handelRemoveQuestion = (index) => {
    updateQuestions((updatedQuestions) => {
      if (updatedQuestions.length === 1) {
        return updatedQuestions;
      }

      let newSelectedIndex = selectedQuestionIndex;

      if (selectedQuestionIndex === index) {
        newSelectedIndex = Math.max(0, selectedQuestionIndex - 1);
      } else if (selectedQuestionIndex > index) {
        newSelectedIndex = Math.max(0, selectedQuestionIndex - 1);
      }

      setSelectedQuestionIndex(newSelectedIndex);

      updatedQuestions.splice(index, 1);
      return updatedQuestions;
    });
  };

  const handleTimerSelect = (selectedTimer) => {
    setTimer(selectedTimer);
  };

  const handelSelectCorrectOption = (questionIndex, optionIndex) => {
    updateQuestions((updatedQuestions) => {
      const newQuestions = [...updatedQuestions];
      const currentQuestion = newQuestions[questionIndex];
      if (currentQuestion.optionType === "image") {
        currentQuestion.answer = {
          text: null,
          imageUrl: currentQuestion.options[optionIndex]?.imageUrl || "",
        };
      } else if (currentQuestion.optionType === "text") {
        currentQuestion.answer = {
          text: currentQuestion.options[optionIndex]?.text || "",
          imageUrl: null,
        };
      } else {
        // For other question types, set the selected option as the correct answer
        currentQuestion.answer = {
          text: currentQuestion.options[optionIndex]?.text || "",
          imageUrl: currentQuestion.options[optionIndex]?.imageUrl || "",
        };
      }

      setQuestions(() => newQuestions);
    });
  };

  const handleAddOption = (index) => {
    updateQuestions((updatedQuestions) => {
      const newQuestions = [...updatedQuestions];
      const options = [...newQuestions[index].options];

      if (options.length < 4) {
        newQuestions[index].options = [...options, { text: "", imageUrl: "" }];
        setQuestions(newQuestions);
      }
    });
  };

  const handleDeleteOption = (questionIndex, optionIndex) => {
    updateQuestions((updatedQuestions) => {
      const questionToUpdate = { ...updatedQuestions[questionIndex] };
      const updatedOptions = [...questionToUpdate.options];
      updatedOptions.splice(optionIndex, 1);
      questionToUpdate.options = updatedOptions;
      updatedQuestions[questionIndex] = questionToUpdate;
    });
  };

  const inputOptions = (questionIndex, optionIndex) => {
    const currentQuestion = questions[questionIndex];
    const isCorrectOption =
      (currentQuestion.optionType === "text" &&
        currentQuestion.answer.text ===
          currentQuestion.options[optionIndex]?.text) ||
      (currentQuestion.optionType === "image" &&
        currentQuestion.answer.imageUrl ===
          currentQuestion.options[optionIndex]?.imageUrl) ||
      (currentQuestion.optionType === "both" &&
        currentQuestion.answer.text ===
          currentQuestion.options[optionIndex]?.text &&
        currentQuestion.answer.imageUrl ===
          currentQuestion.options[optionIndex]?.imageUrl);

    const optionClass = isCorrectOption ? styles.correctOption : "";

    const textTypeOption = (
      <input
        className={`${styles.optionInput} ${optionClass}`}
        type="text"
        id={`textOption${optionIndex}`}
        value={currentQuestion.options[optionIndex]?.text || ""}
        onChange={(e) =>
          handleChangeOption(questionIndex, optionIndex, "text", e)
        }
        placeholder="Text"
      />
    );

    const imageTypeOption = (
      <input
        className={`${styles.optionInput} ${optionClass}`}
        type="text"
        id={`imageOption${optionIndex}`}
        value={currentQuestion.options[optionIndex]?.imageUrl || ""}
        onChange={(e) =>
          handleChangeOption(questionIndex, optionIndex, "image", e)
        }
        placeholder="Image URL"
      />
    );

    return (
      <div key={optionIndex} className={styles.inputGroup}>
        {qaType && (
          <input
            type="radio"
            className={styles.correctOptionRadioButton}
            id={`selectOption${optionIndex}`}
            name={`selectOption${questionIndex}`}
            value={`selectOption${optionIndex}`}
            onChange={() =>
              handelSelectCorrectOption(questionIndex, optionIndex)
            }
            checked={
              currentQuestion.answer.text ===
                currentQuestion.options[optionIndex]?.text ||
              currentQuestion.answer.imageUrl ===
                currentQuestion.options[optionIndex]?.imageUrl ||
              false
            }
          />
        )}

        {currentQuestion.optionType === "text" && textTypeOption}

        {currentQuestion.optionType === "image" && imageTypeOption}

        {currentQuestion.optionType === "both" && (
          <>
            {textTypeOption}
            {imageTypeOption}
          </>
        )}

        {optionIndex >= 2 && (
          <RiDeleteBin5Fill
            className={styles.deleteIcon}
            onClick={() => handleDeleteOption(questionIndex, optionIndex)}
          />
        )}
      </div>
    );
  };

  return (
    <div className="overlay">
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.questionContainer}>
            {questions.map((question, index) => (
              <div
                className={`${styles.circle} ${
                  index === selectedQuestionIndex ? styles.active : ""
                }`}
                key={index}
                onClick={() => setSelectedQuestionIndex(index)}
              >
                {index >= 1 && (
                  <IoIosClose
                    size={22}
                    color="#000"
                    onClick={() => handelRemoveQuestion(index)}
                    className={styles.closeIcon}
                  />
                )}
                <span>{index + 1}</span>
              </div>
            ))}
            {questions.length < 5 && (
              <CiCirclePlus
                color="#969696"
                size={50}
                className={styles.plus}
                onClick={handelAddQuestion}
              />
            )}
          </div>
          <h4 className={styles.headerText}>Max 5 questions</h4>
        </div>

        {questions.map((question, index) => (
          <div
            className={styles.questionInputContainer}
            key={index}
            style={{
              display: index === selectedQuestionIndex ? "block" : "none",
            }}
          >
            <input
              type="text"
              className={styles.questionInput}
              placeholder="Type Your Question"
              required
              onChange={(e) => handleQuestionTextChange(e, index)}
              value={question.questionText}
            />

            <fieldset className={styles.optionType}>
              <label className={styles.optionTypeLabel}>Option Type</label>
              {optionTypes.map((type, i) => (
                <div className={styles.optionTypeItem} key={type.value}>
                  <input
                    type="radio"
                    id={`${type.label}${i}${index}`}
                    name={`optionType${index}`}
                    value={type.value}
                    checked={question.optionType === type.value}
                    onChange={(e) => handleOptionTypeChange(e, index)}
                    className={styles.optionRadioButton}
                  />
                  <label htmlFor={`${type.label}${i}${index}`}>
                    {type.label}
                  </label>
                </div>
              ))}
            </fieldset>

            <div className={styles.Container}>
              <div className={styles.optionsContainer}>
                {question.options?.map((_, optionIndex) =>
                  inputOptions(index, optionIndex)
                )}
                {question.options?.length < 4 && (
                  <button
                    className={styles.addButton}
                    type="button"
                    onClick={() => handleAddOption(index)}
                  >
                    Add Option
                  </button>
                )}
              </div>

              <div className={styles.timerContainer}>
                <label className={styles.timerLabel}>Timer</label>
                {[0, 10, 15].map((timerOption) => (
                  <span
                    key={timerOption}
                    className={`${styles.timerBtn} ${
                      timer === timerOption ? styles.selected : ""
                    }`}
                    onClick={() => handleTimerSelect(timerOption)}
                  >
                    {timerOption === 0 ? "OFF" : `${timerOption} Sec`}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

        <div className={styles.buttonContainer}>
          <button
            type="button"
            className="quiz-btn secondary"
            onClick={handleCancel}
            disabled={isEditing}
          >
            Cancel
          </button>

          <button
            type="button"
            className="quiz-btn primary"
            onClick={handleContinue}
            disabled={isEditing}
          >
            {isEditing ? "Editing quiz..." : "Edit Quiz"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuestionEditForm;
