import { QuestionAnalysis } from "../components";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { useQuizAnalysis } from "../queries/useQuizAnalysis";
import { formatDate, formatImpressionCount } from "../utils/helpers";
import styles from "./QuizAnalysis.module.css";

function QuizAnalysis() {
  const { isLoading, quizAnalysis, error } = useQuizAnalysis();

  if (isLoading) return <Loading />;

  if (error) {
    return <Error error={error} />;
  }

  const { questionWiseAnalysis, quizDetails } = quizAnalysis;

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2 className={styles.title}>{quizDetails.quizName}</h2>
        <div className={styles.details}>
          <p>Created On: {formatDate(quizDetails?.createdAt)}</p>
          <p>
            Impressions: {formatImpressionCount(quizDetails?.impressionCount)}
          </p>
        </div>
      </header>
      <div className={styles.questionContainer}>
        {questionWiseAnalysis.map((question, index) => (
          <QuestionAnalysis
            question={question}
            type={quizDetails?.quizType}
            key={index}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}

export default QuizAnalysis;
