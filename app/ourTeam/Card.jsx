// import img from './assets/img.jpeg'
import Image from "next/image";

function Card({ data }) {
    return (
        <div className="card-container">
            {data.map((person, index) => (  // Here 'person' is a single object in the array
                <div key={index} className="card">
                    <Image className="profile-img" src={person.imageSrc} alt={person.name} width={100} height={70} />
                    {/* <img className="profile-img" src={person.imageSrc} alt={person.name} /> */}
                    <div className="lower-part">
                        <h1 className='position'>{person.position}</h1>
                        <p className='name'>{person.name}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Card