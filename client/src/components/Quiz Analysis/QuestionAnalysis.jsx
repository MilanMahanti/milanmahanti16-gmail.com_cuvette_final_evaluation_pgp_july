import PollOptions from "./PollOptions";
import QaOptions from "./QaOptions";
import styles from "./QuestionAnalysis.module.css";

function QuestionAnalysis({ question, type, index }) {
  return (
    <div>
      <h3 className={styles.question}>
        Q{index + 1}.{question.questionText}
      </h3>
      <div className={styles.optionsContainer}>
        {type === "qa" ? (
          <QaOptions question={question} />
        ) : (
          <PollOptions question={question} />
        )}
      </div>
    </div>
  );
}

export default QuestionAnalysis;
