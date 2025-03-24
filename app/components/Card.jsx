function Card({ data }) {
  return (
    <div>
      <div className="card">
        <img className="profile-img" src={data.imageSrc} alt={data.name} />
        <div className="lower-part">
          <h2 className="position">{data.position}</h2>
          <p className="name">{data.name}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
