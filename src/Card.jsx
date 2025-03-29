// import img from './assets/img.jpeg'
function Card({ data }) {
    return (
        <div className="card-container">
            {data.map((person, index) => (  // Here 'person' is a single object in the array
                <div key={index} className="card">
                    <img className="profile-img" src={person.imageSrc} alt={person.name} />
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