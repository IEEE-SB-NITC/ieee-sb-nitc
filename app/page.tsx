import "./landingPage.css"
import Count from '../Elements/count/Count';
import Info from '../Elements/info/Info';
import Scroll from '../Elements/scroll/Scroll';


export default function Home() {
  return (
    <div>
      <Count/>
      <Info/>
      <Scroll/>
    </div>
  );
}
