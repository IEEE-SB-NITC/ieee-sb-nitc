import styles from "./Card.module.css";

function Card({ data }) {
  return (
    <div className={styles.card}>
      <img className={styles.profileImg} src={data.imageSrc} alt={data.name} />
      <div className={styles.lowerPart}>
        <h2 className={styles.position}>{data.position}</h2>
        <p className={styles.name}>{data.name}</p>
      </div>
    </div>
  );
}

export default Card;
