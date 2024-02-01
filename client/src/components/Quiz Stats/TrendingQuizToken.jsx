import { formatDate } from "../../utils/helpers";
import { HiOutlineEye } from "react-icons/hi";
import styles from "./TrendingQuizToken.module.css";
function TrendingQuizToken({ quiz }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <p className={styles.title}>{quiz.title}</p>
        <div className={styles.impressions}>
          <span> {quiz.impressions}</span>
          <HiOutlineEye />
        </div>
      </header>
      <p className={styles.date}>
        Created At:
        <span className={styles.date}> {formatDate(quiz.createdAt)}</span>
      </p>
    </div>
  );
}

export default TrendingQuizToken;
