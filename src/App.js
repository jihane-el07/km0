import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import './App.css';

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
import Contact from './pages/Contact/Contact';
import Verification from './pages/Verification/Verification';
import VerificationDetails from './pages/Verification/VerificationDetails';
// import Cart from './pages/Patissier/Cart/Cart';

// Protected Route for Verifiers
const ProtectedVerifierRoute = ({ children }) => {
  const [isVerifier, setIsVerifier] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkVerifier = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsVerifier(false);
          setLoading(false);
          return;
        }

        const response = await fetch('https://km0-api.vercel.app/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          setIsVerifier(false);
          setLoading(false);
          return;
        }

        const userData = await response.json();
        setIsVerifier(userData.role === 'verifier');
      } catch (error) {
        console.error('Auth check error:', error);
        setIsVerifier(false);
      } finally {
        setLoading(false);
      }
    };

    checkVerifier();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isVerifier) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Public Route - Only accessible when not logged in
const PublicRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        const response = await fetch('https://km0-api.vercel.app/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        const userData = await response.json();
        setIsAuthenticated(userData.role === 'verifier');
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Navigate to="/verification" replace />;
  }

  return children;
};

import Cart from './pages/Patissier/Cart/Cart';
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
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const addToCart = (price, quantity = 1) => {
    const priceNumber = parseFloat(price.replace(',', '.'));
    setCartCount(prev => prev + quantity);
    setTotalPrice(prev => parseFloat((prev + priceNumber * quantity).toFixed(2)));
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        const response = await fetch('https://km0-api.vercel.app/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        const userData = await response.json();
        const isVerifier = userData.role === 'verifier';
        setIsAuthenticated(isVerifier);

        // If user is a verifier and not already on verification page, redirect them
        if (isVerifier && !location.pathname.startsWith('/verification')) {
          navigate('/verification');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate, location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  // Hide Nav & Footer on login, signup pages, and when authenticated
  const hideNavAndFooter = location.pathname === '/login' ||
    location.pathname === '/signup' ||
    isAuthenticated;

  if (isLoading) {
    return null; // Don't render anything while checking authentication
  }

  return (
    <Router>
      <ScrollToTop />
      {!isAuthenticated && <IntroLayer />}
      {!hideNavAndFooter && <Nav cartCount={cartCount} totalPrice={totalPrice} onLogout={handleLogout} isAuthenticated={isAuthenticated} />}
      <Routes>
        <Route path='/' element={
          <PublicRoute>
            <Home />
          </PublicRoute>
        } />
        <Route path='/Menu' element={
          <PublicRoute>
            <BookMenu />
          </PublicRoute>
        } />
        <Route path='/Event' element={
          <PublicRoute>
            <Events />
          </PublicRoute>
        } />
        <Route path='/Patisserie' element={
          <PublicRoute>
            <Patissier addToCart={addToCart} cartCount={cartCount} totalPrice={totalPrice} />
          </PublicRoute>
        } />
        <Route path='/Book-Table' element={
          <PublicRoute>
            <Reservation />
          </PublicRoute>
        } />
        <Route path='/signup' element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        } />
        <Route path='/login' element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />
        <Route path='/Contact' element={
          <PublicRoute>
            <Contact />
          </PublicRoute>
        } />
        <Route path='/verification' element={
          <ProtectedVerifierRoute>
            <Verification />
          </ProtectedVerifierRoute>
        } />
        <Route path='/verification/:reservationId' element={
          <ProtectedVerifierRoute>
            <VerificationDetails />
          </ProtectedVerifierRoute>
        } />
        <Route path='/:category' element={
          <PublicRoute>
            <Products />
          </PublicRoute>
        } />
      </Routes>
      {!hideNavAndFooter && <Nav cartCount={cartCount} totalPrice={totalPrice} />}
    </Router>
  )
}

export default App;
