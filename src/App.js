import './App.css';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import IntroLayer from './pages/intro/IntroLayer';
import Home from './pages/Home/Home';
import Nav from './pages/Nav/Nav';
import Events from './pages/Events/Events';
import Footer from './pages/Footer/Footer';
import Patissier from './pages/Patissier/Patissier';
import Products from './pages/Patissier/Products/Products';
import Reservation from './pages/Reservation/Reservation';
import SignUp from './pages/SignUp/SignUp';
import Login from './pages/Login/Login';
import BookMenu from './pages/Menu/book-menu';
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  return null;
};

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (window.location.pathname !== '/') {
      navigate('/');
    }
  }, []);

  // Hide Nav & Footer on login and signup pages
  const hideNavAndFooter = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="App">
      <ScrollToTop />
      <IntroLayer />
      {!hideNavAndFooter && <Nav />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Menu' element={<BookMenu />} />
        <Route path='/Event' element={<Events />} />
        <Route path='/Patisserie' element={<Patissier />} />
        <Route path='/:category' element={<Products />} />
        <Route path='/Book-Table' element={<Reservation />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
      </Routes>

      {!hideNavAndFooter && <Footer />}
    </div>
  );
}

export default App;
