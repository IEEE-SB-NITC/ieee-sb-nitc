import React from 'react';
import Image from 'next/image'; // only use this if you're using Next.js

const Card = ({ data }) => {
  return (
    <div className="card-container">
      {data.map((person, index) => (
        <div className="head" key={index}>
          <Image src={person.imageSrc} alt={person.heading} width={300} height={200} />
          <div>{person.heading}</div>
          <div>
            <p>{person.date}</p>
            <p>{person.venue}</p>
          </div>
          <button>Register Now</button>
        </div>
      ))}
    </div>
  );
};

export default Card;
