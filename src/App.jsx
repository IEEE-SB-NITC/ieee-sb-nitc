import Card from "./components/Card";
import "../src/styles.css"
import contacts from './contacts';

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
        <Card
          img={contacts[2].imgURL}
          title={contacts[2].title}
          date={contacts[2].date}
          location={contacts[2].location}
        />
        <Card
          img={contacts[3].imgURL}
          title={contacts[3].title}
          date={contacts[3].date}
          location={contacts[3].location}
        />
        <Card
          img={contacts[4].imgURL}
          title={contacts[4].title}
          date={contacts[4].date}
          location={contacts[4].location}
        />
        
      </div>
   </div>
  );
}

export default App
