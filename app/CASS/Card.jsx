import React from 'react';
import Image from 'next/image'; // only use this if you're using Next.js

const Card = ({image,heading,venue,date}) => {
  return (
    <div className="card-container">
        <div className="head">
          <Image className='imageCard' src={image} alt='' width={300} height={200} />
          <div>{heading}</div>
          <div>
            <p>{date}</p>
            <p>{venue}</p>
          </div>
          <button>Register Now</button>
        </div>
      {/* {data.map((datad, index) => (
      ))} */}
    </div>
  );
};

export default Card;
