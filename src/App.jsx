import Card from "./Card.jsx"
import Header from './header.jsx'
import SubHeading from "./SubHeading.jsx";

function App() {

  const data = [
    { name: "Alice Johnson", position: "Software Engineer", imageSrc: "/img.jpeg" },
    { name: "Bob Smith", position: "Product Manager", imageSrc:  "/img.jpeg" },
    { name: "Charlie Brown", position: "UI/UX Designer", imageSrc:  "/img.jpeg" },
    { name: "David Lee", position: "Backend Developer", imageSrc:  "/img.jpeg" },
    { name: "Emma Watson", position: "DevOps Engineer", imageSrc:  "/img.jpeg" }
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

export default App
