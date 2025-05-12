
import './App.css';
import IntroLayer from './pages/intro/IntroLayer';
import Home from './pages/Home/Home';
import Nav from './pages/Nav/Nav';
import Events from './pages/Events/Events';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return null;
};

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname !== '/') {
      navigate('/');
    }
  }, []);
  return (
    <div className="App">
      <ScrollToTop />
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
