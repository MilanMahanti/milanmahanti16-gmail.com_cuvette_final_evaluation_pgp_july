import styles from "./Result.module.css";
import image from "../assets/trophy.png";

function Result({ result, quizType }) {
  if (quizType === "poll") {
    return (
      <div className={styles.container}>
        <h1 className={styles.heading}>
          Thank you
          <br /> for participating
          <br /> in the Poll
        </h1>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <h1>Congrats Quiz is completed</h1>
      <img src={image} alt="trophy" className={styles.img} />
      <div className={styles.scoreContainer}>
        <h2>Your Score is</h2>
        <p className={styles.score}>
          0{result?.result}/0{result?.totalQuestion}
        </p>
      </div>
    </div>
  );
}

export default Result;
