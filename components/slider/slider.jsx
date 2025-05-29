import Card from "./Card/Card";
import "./styles.css"
import contacts from './contacts';

function createEntry(contacts) {
  return (
    <Card
      key={contacts.id}
      img={contacts.imgURL}
      title={contacts.title}
      date={contacts.date}
      location={contacts.location}
    />
  );
}        
function App() {
  return(
   <div> 
      <div className="heading">
        <h1 className="mango">What's Ahead</h1>
      </div>
        <dl className="ak">{contacts.map(createEntry)}</dl>
   </div>
  );
}

export default App