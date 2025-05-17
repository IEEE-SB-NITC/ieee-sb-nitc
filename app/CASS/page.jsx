import React from 'react'
import "./CASS.css"
import Header from './Header'
import EmblaCarousel from './Embla'
import Section from './Section'
import Card from './Card'

const CASS = () => {

  const data = [
    { heading: "CONTROL SYSTEM APPLICATION IN LAUNCH VEHICLES ", venue: "Software Engineer", imageSrc: "/assets/img.jpg", date:"24-01-2005" },
    { heading: "CONTROL SYSTEM APPLICATION IN LAUNCH VEHICLES ", venue: "Software Engineer", imageSrc: "/assets/img.jpg", date:"24-01-2005" },
    { heading: "CONTROL SYSTEM APPLICATION IN LAUNCH VEHICLES ", venue: "Software Engineer", imageSrc: "/assets/img.jpg", date:"24-01-2005" },
    { heading: "CONTROL SYSTEM APPLICATION IN LAUNCH VEHICLES ", venue: "Software Engineer", imageSrc: "/assets/img.jpg", date:"24-01-2005" },
    { heading: "CONTROL SYSTEM APPLICATION IN LAUNCH VEHICLES ", venue: "Software Engineer", imageSrc: "/assets/img.jpg", date:"24-01-2005" },
    { heading: "CONTROL SYSTEM APPLICATION IN LAUNCH VEHICLES ", venue: "Software Engineer", imageSrc: "/assets/img.jpg", date:"24-01-2005" },
    // { heading: "Bob Smith", venue: "Product Manager", imageSrc:  "/assets/img.jpeg", date:"24-01-2005" },
    // { heading: "Charlie Brown", venue: "UI/UX Designer", imageSrc:  "/assets/img.jpeg", date:"24-01-2005" },
    // { heading: "David Lee", venue: "Backend Developer", imageSrc:  "/assets/img.jpeg", date:"24-01-2005" },
    // { heading: "Emma Watson", venue: "DevOps Engineer", imageSrc:  "/assets/img.jpeg", date:"24-01-2005" }
];



  return (
    <div>
        <Header/>
        <div className='UpcomingEvents'>UPCOMING EVENTS</div>
        <EmblaCarousel data={data}/>
        {/* <Card data={data}></Card> */}
        <div className='Section'>
            <Section text1={'Our Mission'} text2={'The IEEE Communications Society promotes technological innovation and fosters creation and sharing of information among  the global technical community. The Society provides services to members for their technical and professional advancement and forums for technical exchanges among professionals in academia, industry, and public institutions.'}/>
            <Section text1={'Our vision'} text2={'To bring the world together in harmony through communications and networking technology research, application, education, and incubation of new ideas.'}/>
        </div>
    </div>
  )
}

export default CASS