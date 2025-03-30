import React from 'react'
import "./ourTeam.css"
import Card from "./Card.jsx"
import Header from './header.jsx'
import SubHeading from "./SubHeading.jsx";

const ourTeam = () => {
  const data = [
    { name: "Alice Johnson", position: "Software Engineer", imageSrc: "/assets/img.jpeg" },
    { name: "Bob Smith", position: "Product Manager", imageSrc:  "/assets/img.jpeg" },
    { name: "Charlie Brown", position: "UI/UX Designer", imageSrc:  "/assets/img.jpeg" },
    { name: "David Lee", position: "Backend Developer", imageSrc:  "/assets/img.jpeg" },
    { name: "Emma Watson", position: "DevOps Engineer", imageSrc:  "/assets/img.jpeg" }
];
  
  return(
    <>
    <Header></Header>
    <div  className="cd">
    <Card data={data}></Card>
    </div>
    <SubHeading topic="Software"></SubHeading>
    <SubHeading topic="Multimedia"></SubHeading>
    <div  className="cd">
    <Card data={data}></Card>
    </div>
    </>
  )
}

export default ourTeam