import styles from "./QuizCreationFinalPage.module.css";
import { IoIosClose } from "react-icons/io";
import { useParams } from "react-router-dom";
import { useMoveBack } from "../../hooks/useMoveBack";
import { copyLink } from "../../utils/helpers";
function QuizCreationFinalPage() {
  const { newQuizId } = useParams();
  const { origin } = window.location;
  const moveBack = useMoveBack();

  return (
    <div className="overlay">
      <div className={styles.modal}>
        <div className={styles.container}>
          <h1 className={styles.heading}>Congrats your Quiz is Published!</h1>
          <div className={styles.inputContainer}>
            <input
              defaultValue={`${origin}/quiz/${newQuizId}`}
              disabled
              className={styles.input}
            />
            <button
              className="quiz-btn primary"
              onClick={() => copyLink(`${origin}/quiz/${newQuizId}`)}
            >
              Share
            </button>
          </div>
        </div>
        <IoIosClose size={40} className={styles.closeBtn} onClick={moveBack} />
      </div>
    </div>
  );
}

export default QuizCreationFinalPage;
