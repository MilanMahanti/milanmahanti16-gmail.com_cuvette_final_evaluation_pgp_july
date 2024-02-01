import { TableRow } from "../components";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { useAllQuiz } from "../queries/useAllQuiz";
import styles from "./Analytics.module.css";

function Analytics() {
  const { isLoading, quizzes, error } = useAllQuiz();

  if (isLoading) return <Loading />;

  if (error) {
    return <Error error={error} />;
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Quiz Analysis</h1>
      <div className={styles.table}>
        {!isLoading && quizzes?.quizzes?.length === 0 ? (
          <p className={styles.message}>
            No Quiz data present to show analysis.
          </p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Quiz Name</th>
                <th>Created On</th>
                <th>Impression</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {quizzes?.quizzes?.map((quiz, index) => (
                <TableRow quiz={quiz} index={index} key={index} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Analytics;
