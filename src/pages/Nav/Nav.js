import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Nav.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { ShoppingBag, AlertCircle } from "lucide-react"
import axios from 'axios';

export default function Nav({ cartCount, totalPrice }) {
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 120 || location.pathname !== '/';
      setScrolled(isScrolled);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://km0-api.vercel.app/auth/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      setShowConfirmLogout(false);
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      setShowConfirmLogout(false);
      navigate('/login');
    }
  };

  return (
    <>
      <nav className={`navbar navbar-expand-sm ${scrolled ? styles.scrolled : ''} ${styles.navbar}`}>
        <div className="container-fluid d-flex justify-content-between align-items-center ps-5 pe-5">
          {/* Left Side Links */}
          <ul className="navbar-nav left d-flex flex-row gap-3">
            <li className="nav-item">
              <Link className={`${styles.navLink} ${scrolled ? styles.scrolled : ''} fs-5`} to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className={`${styles.navLink} ${scrolled ? styles.scrolled : ''} fs-5`} to="/Event">Events</Link>
            </li>
            <li className="nav-item">
              <Link className={`${styles.navLink} ${scrolled ? styles.scrolled : ''} fs-5`} to="/Patisserie">Patisserie</Link>
            </li>
            <li className="nav-item">
              <Link className={`${styles.navLink} ${scrolled ? styles.scrolled : ''} fs-5`} to="/Menu">Menu</Link>
            </li>
            <li className="nav-item">
              <Link className={`${styles.navLink} ${scrolled ? styles.scrolled : ''} fs-5`} to="/contact">Contact Us</Link>
            </li>
          </ul>

          {/* Center Logo */}
          <div className="text-center">
            <Link className="nav-link" to="/"><img src="images/M.png" alt="morocco map" width={100} style={{ marginTop: "10px" }} /></Link>
          </div>

          {/* Right Side Links */}
          <ul className="navbar-nav d-flex flex-row right gap-5">
            {(location.pathname === '/Patisserie' || /^\/[^/]+$/.test(location.pathname)) && (
              <div className={styles.userActions}>
                <a href="#cart" className={styles.cart}>
                  <span>{(totalPrice || 0).toFixed(2)} DH</span>
                  <div className={styles.cartIcon}>
                    <span className={styles.cartCount}>{cartCount}</span>
                    <ShoppingBag className={styles.Icon} />
                  </div>
                </a>
              </div>
            )}

            {isLoggedIn ? (
              <li className="nav-item">
                <Link
                  onClick={() => setShowConfirmLogout(true)}
                  className={`${styles.navLink} ${scrolled ? styles.scrolled : ''} fs-5`}
                >
                  Logout
                </Link>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className={`${styles.navLink} ${scrolled ? styles.scrolled : ''} fs-5`} to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className={`${styles.navLink} ${scrolled ? styles.scrolled : ''} fs-5`} to="/signup">Sign up</Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link
                className={`${styles.navLink} ${scrolled ? styles.scrolled : ''} fs-5`}
                to={isLoggedIn ? "/Book-Table" : "/login"}
              >
                Book Table
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      {showConfirmLogout && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <AlertCircle size={24} className={styles.warningIcon} />
              <h3>Confirm Logout</h3>
            </div>
            <p>Are you sure you want to logout?</p>
            <div className={styles.modalActions}>
              <button
                className={styles.cancelBtn}
                onClick={() => setShowConfirmLogout(false)}
              >
                Cancel
              </button>
              <button
                className={styles.confirmBtn}
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
