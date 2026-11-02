"use client";

import styles from "./Card.module.css";

function Card({ data }) {
  const handleImageDownload = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(data.imageSrc);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      const fileName = data.imageSrc.split("/").pop();
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download image:", error);
    }
  };

  return (
    <div className={styles.card}>
      <img
        className={styles.profileImg}
        src={data.imageSrc}
        alt={data.name}
        onClick={handleImageDownload}
        style={{ cursor: "pointer" }}
        title={`Click to download ${data.name}'s photo`}
      />
      <div className={styles.lowerPart}>
        <h2 className={styles.position}>{data.position}</h2>
        <p className={styles.name}>{data.name}</p>
      </div>
    </div>
  );
}

export default Card;
