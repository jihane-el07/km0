import logo from './logo.svg';
import './App.css';
import IntroLayer from './IntroLayer';

function App() {
  return (
    <div className="App">
      <IntroLayer/>
      <img src="images/M.png" alt="morocco map" className="mr-map" width={100} style={{marginLeft:"50%",marginTop:"10px"}}/>
    </div>
  );
}

export default App;
