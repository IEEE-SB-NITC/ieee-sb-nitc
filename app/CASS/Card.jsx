import React from 'react';
import Image from 'next/image'; // only use this if you're using Next.js

const Card = ({ data }) => {
  return (
    <div className="card-container">
      {data.map((datad, index) => (
        <div className="head" key={index}>
          <Image className='imageCard' src={datad.imageSrc} alt={datad.heading} width={300} height={200} />
          <div>{datad.heading}</div>
          <div>
            <p>{datad.date}</p>
            <p>{datad.venue}</p>
          </div>
          <button>Register Now</button>
        </div>
      ))}
    </div>
  );
};

export default Card;
