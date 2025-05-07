import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Nav.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 120 || location.pathname !== '/';
      setScrolled(isScrolled);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  return (
    <nav className={`navbar navbar-expand-sm ${scrolled ? styles.scrolled : ''} ${styles.navbar}`}>
      <div className="container-fluid d-flex justify-content-between align-items-center ps-5 pe-5">
        {/* Left Side Links */}
        <ul className="navbar-nav left d-flex flex-row gap-3">
          {['/', '/Event', '/Patisserie', '/Menu', '/contact'].map((path, i) => (
            <li className="nav-item" key={i}>
              <Link
                className={`${styles.navLink} ${scrolled ? styles.scrolled : ''} fs-5`}
                to={path}
              >
                {path === '/' ? 'Home' : path.replace('/', '')}
              </Link>
            </li>
          ))}
        </ul>

        {/* Center Logo */}
        <div className="text-center">
          <Link className="nav-link" to="/"><img src="images/M.png" alt="morocco map" width={100} style={{ marginTop: "10px" }} /></Link>
        </div>

        {/* Right Side Links */}
        <ul className="navbar-nav d-flex flex-row right gap-5">
          {['/login', '/signup', '/Book-Table'].map((path, i) => (
            <li className="nav-item" key={i}>
              <Link
                className={`${styles.navLink} ${scrolled ? styles.scrolled : ''} fs-5`}
                to={path}
              >
                {path.replace('/', '').replace('-', ' ')}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
