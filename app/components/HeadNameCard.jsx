import styles from "./HeadNameCard.module.css";
function HeadNameCard({ text }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.mainText}>{text}</h1>
    </div>
  );
}

export default HeadNameCard;
