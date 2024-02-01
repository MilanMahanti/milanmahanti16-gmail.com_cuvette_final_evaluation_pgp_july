import styles from "./StatItem.module.css";

const StatItem = ({ count, title, color }) => {
  return (
    <div style={{ color }} className={styles.statContainer}>
      <span className={styles.count}>{count}</span>
      <h5 className={styles.title}>{title}</h5>
    </div>
  );
};

export default StatItem;
