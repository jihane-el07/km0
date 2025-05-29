import './App.css';

import IntroLayer from './pages/intro/IntroLayer';
import Home from './pages/Home/Home';
import Nav from './pages/Nav/Nav';
import Events from './pages/Events/Events';
import Footer from './pages/Footer/Footer';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Patissier from './pages/Patissier/Patissier';
import Products from './pages/Patissier/Products/Products';
import ProductCategory from './pages/Patissier/Products/ProductCategory';
import Reservation from './pages/Reservation/Reservation';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
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
        <Route path='/Patisserie' element={<Patissier />} />
        {/* <Route path='/Products' element={<Products />} /> */}
        <Route path="/:category" element={<Products />} />
        <Route path="/Book-Table" element={<Reservation />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
