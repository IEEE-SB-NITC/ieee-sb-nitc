import { FaLocationDot } from "react-icons/fa6";
import { MdWorkHistory } from "react-icons/md";

function Card(props) {
  return (
    <div className="card">
      <div className="top">
        <img className="circle-img" src={props.img} alt="avatar_img" />
      </div>
      <div className="bottom"></div>
      <div className="event-details">
        <div>
          <h2 className="event-title">{props.title}</h2>
        </div>
        <div className="detail-item">
          <span className="icon"><MdWorkHistory /></span>
          <span>{props.date}</span>
        </div>
        <div className="detail-item1">
          <span className="icon"><FaLocationDot /></span>
          <span>{props.location}</span>
        </div>
        <button className="register-button">
          <span className="register-text">Register Now</span>
          {/* <img className="tiqr" src="/tiqrr.png" alt=""/> */}
        </button>
      </div>
    </div>
  );
}

export default Card;