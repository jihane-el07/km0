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
import Cart from './pages/Patissier/Cart/Cart';
import NotFound from './pages/NotFound/NotFound';
import Dashboard from './pages/Dashboard/Dashboard';

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

// Protected Route for Admin
const ProtectedAdminRoute = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        const response = await fetch('https://km0-api.vercel.app/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        const userData = await response.json();
        setIsAdmin(userData.role === 'admin');
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// Public Route - Only accessible when not logged in and not admin
const PublicRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsAuthenticated(false);
          setIsAdmin(false);
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
          setIsAdmin(false);
          setLoading(false);
          return;
        }

        const userData = await response.json();
        setIsAuthenticated(userData.role === 'verifier');
        setIsAdmin(userData.role === 'admin');
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
        setIsAdmin(false);
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

  if (isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

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
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showCartModal, setShowCartModal] = useState(false);

  const addToCart = (product, quantity) => {
    const price = typeof product.price === 'number' ? product.price.toString() : product.price;
    const formattedPrice = price.replace(',', '.');
    const numericPrice = parseFloat(formattedPrice);

    const newItem = {
      id: product._id,
      name: product.name,
      price: numericPrice,
      quantity: quantity,
      image: product.image
    };

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === newItem.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, newItem];
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Update cart count and total price whenever cart changes
  useEffect(() => {
    const newCount = cart.reduce((total, item) => total + item.quantity, 0);
    const newTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    setCartCount(newCount);
    setTotalPrice(parseFloat(newTotal.toFixed(2)));
  }, [cart]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsAuthenticated(false);
          setIsAdmin(false);
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
          setIsAdmin(false);
          setIsLoading(false);
          return;
        }

        const userData = await response.json();
        const isVerifier = userData.role === 'verifier';
        const isAdminUser = userData.role === 'admin';
        setIsAuthenticated(isVerifier);
        setIsAdmin(isAdminUser);

        // If user is a verifier and not already on verification page, redirect them
        if (isVerifier && !location.pathname.startsWith('/verification')) {
          navigate('/verification');
        }

        // If user is admin and not on dashboard, redirect them
        if (isAdminUser && location.pathname !== '/dashboard') {
          navigate('/dashboard');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate, location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setIsAdmin(false);
    navigate('/login');
  };

  // Hide Nav & Footer on login, signup pages, when authenticated, or when admin
  const hideNavAndFooter = location.pathname === '/login' ||
    location.pathname === '/signup' ||
    isAuthenticated ||
    isAdmin;

  if (isLoading) {
    return null;
  }

  return (
    <div className="App">
      <ScrollToTop />
      {!isAuthenticated && <IntroLayer />}
      {!hideNavAndFooter && (
        <Nav
          cartCount={cartCount}
          totalPrice={totalPrice}
          onLogout={handleLogout}
          isAuthenticated={isAuthenticated}
          cart={cart}
          setCart={setCart}
          showCartModal={showCartModal}
          setShowCartModal={setShowCartModal}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
        />
      )}
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
            <Verification />
          </ProtectedVerifierRoute>
        } />
        <Route path='/verify' element={
          <ProtectedVerifierRoute>
            <Verification />
          </ProtectedVerifierRoute>
        } />
        <Route path='/verify/:reservationId' element={
          <ProtectedVerifierRoute>
            <Verification />
          </ProtectedVerifierRoute>
        } />
        <Route path='/Patisserie/:category' element={
          <PublicRoute>
            <Products addToCart={addToCart} />
          </PublicRoute>
        } />
        {/* Dashboard route - protected and no nav/footer */}
        <Route path="/dashboard" element={
          <ProtectedAdminRoute>
            <Dashboard />
          </ProtectedAdminRoute>
        } />
        {/* Catch all route for unmatched paths - must be last */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!hideNavAndFooter && <Footer />}
    </div>
  );
}

export default App;