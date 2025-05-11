import Card from "./components/Card";
import "../public/styles.css"
import contacts from './contacts';
import image1 from "./assets/robospark.jpg"
import image2 from "./assets/cybersecurity.jpg"



function App() {
  return(
   <div> 
      <div className="heading">
        <h1 className="mango">What's Ahead</h1>
      </div>
      <div className="ak">
        <Card
          img={contacts[0].imgURL}
          title={contacts[0].title}
          date={contacts[0].date}
          location={contacts[0].location}
        />
        <Card
          img={contacts[1].imgURL}
          title={contacts[1].title}
          date={contacts[1].date}
          location={contacts[1].location}
        />
      </div>
   </div>
  );
}

export default App
