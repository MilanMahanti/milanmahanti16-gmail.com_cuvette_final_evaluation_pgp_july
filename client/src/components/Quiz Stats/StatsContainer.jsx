import { useQuizStats } from "../../queries/useQuizStats";
import { formatImpressionCount } from "../../utils/helpers";
import StatItem from "./StatItem";
import styles from "./StatsContainer.module.css";
function StatsContainer() {
  const { stats } = useQuizStats();
  const quizStats = stats?.quizStats;
  const defaultStats = [
    {
      title: "Total Quizzes",
      count: quizStats?.totalQuizzes || 0,
      color: "#FF5D01",
    },
    {
      title: "Total Questions",
      count: quizStats?.totalQuestions || 0,
      color: "#60B84B",
    },
    {
      title: "Total Impression",
      count: formatImpressionCount(quizStats?.totalImpressions) || 0,
      color: "#5076FF",
    },
  ];

  return (
    <div className={styles.container}>
      {defaultStats.map((item, index) => (
        <StatItem key={index} {...item} />
      ))}
    </div>
  );
}

export default StatsContainer;
