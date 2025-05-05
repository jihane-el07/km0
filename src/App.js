
import './App.css';
import IntroLayer from './pages/intro/IntroLayer';
import Home from './pages/Home/Home';
import Nav from './pages/Nav/Nav';
import { Route, Routes } from 'react-router-dom';
import Reservation from './pages/Reservation/Reservation';
function App() {
  return (
    <div className="App">
      <IntroLayer/>
      <Nav/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Book-Table' element={<Reservation/>}/>
      </Routes>
    </div>
  );
}

export default App;
