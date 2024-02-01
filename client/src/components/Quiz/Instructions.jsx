import styles from "./Instructions.module.css";

function Instructions({ setView }) {
  return (
    <div className={styles.container}>
      <h1>Hey Welcome to Quizze</h1>
      <div className={styles.flex}>
        <p>Instructions for taking the quiz:</p>
        <ul>
          <li>
            Do not refresh the page once you have already started the quiz.
          </li>
          <li>Use &quot;next&quot; button to move to next question.</li>
          <li>For timed quiz, questions will get automatically submitted.</li>
          <li>Just have fun and enjoy the Quiz.</li>
        </ul>
        <button
          className="quiz-btn primary"
          onClick={() => setView("questions")}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}

export default Instructions;
