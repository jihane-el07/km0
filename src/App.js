
import './App.css';
import IntroLayer from './pages/intro/IntroLayer';
import Home from './pages/Home/Home';
import Nav from './pages/Nav/Nav';
import Events from './pages/Events/Events';
import { Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <IntroLayer/>
      <Nav/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Event' element={<Events/>}/>
      </Routes>
    </div>
  );
}

export default App;
