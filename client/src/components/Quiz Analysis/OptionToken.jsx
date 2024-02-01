import styles from "./OptionToken.module.css";

function OptionToken({ option, type = "poll" }) {
  const variation = type === "poll" ? styles.poll : styles.qa;
  return (
    <div className={`${styles.option}  ${variation}`}>
      <span className={styles.count}>{option.count}</span>
      <p className={styles.title}>{option.title}</p>
    </div>
  );
}

export default OptionToken;
