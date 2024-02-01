import { useAllQuiz } from "../../queries/useAllQuiz";
import styles from "./TrendingQuizContainer.module.css";
import Loading from "../Loading";
import TrendingQuizToken from "./TrendingQuizToken";

function TrendingQuizContainer() {
  const { isLoading, quizzes, error } = useAllQuiz();
  const trendingQuizzes =
    quizzes?.quizzes.filter((el) => el.impressions >= 10).slice(0, 9) || [];
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Loading />
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <h2>Trending Quizzes</h2>
      {error && <p className="error">{error.message}</p>}
      {trendingQuizzes.length === 0 && (
        <p className={styles.trending}>No trending quiz to display</p>
      )}
      <div className={styles.tokenContainer}>
        {trendingQuizzes.map((quiz, index) => (
          <TrendingQuizToken key={index} quiz={quiz} />
        ))}
      </div>
    </div>
  );
}

export default TrendingQuizContainer;
