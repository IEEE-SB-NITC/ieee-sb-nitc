function HeadNameCard({ text }) {
  const styles = {
    container: {
      background:
        "linear-gradient(to right,rgb(161, 95, 189), rgb(93, 177, 255))",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      color: "rgb(238, 238, 238)",
      height: "50px",
    },
    card: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      borderRadius: "15px",
      width: "60%" /* Reduce width for smaller cards */,
      // maxWidth: "500px" /* Set a maximum width */,
      height: "auto" /* Keep height responsive */,
      overflow: "hidden",
    },
    position: {
      margin: 0,
      fontWeight: "bold",
    },
  };
  return (
    <div className="headname-card-container">
      <div style={styles.card}>
        <div style={styles.container}>
          <h1 style={styles.position}>{text}</h1>
        </div>
      </div>
    </div>
  );
}

export default HeadNameCard;
