import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 150;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <nav className={`navbar navbar-expand-sm ${scrolled ? 'scrolled' : ''}`}>
      <div className="container-fluid d-flex justify-content-between align-items-center ps-5 pe-5">
        {/* Left Side Links */}
        <ul className="navbar-nav left d-flex flex-row gap-3">
          <li className="nav-item">
            <Link className={`nav-link  fs-5 ${scrolled ? 'scrolled' : ''}`} to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link  fs-5 ${scrolled ? 'scrolled' : ''}`} to="/Event">Event</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link  fs-5 ${scrolled ? 'scrolled' : ''}`} to="/Patisserie">Patisserie</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link  fs-5 ${scrolled ? 'scrolled' : ''}`} to="/Menu">Menu</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link  fs-5 ${scrolled ? 'scrolled' : ''}`} to="/contact">Contact Us</Link>
          </li>
        </ul>

        {/* Centered Logo */}
        <div className="text-center">
        <Link className="nav-link" to="/"><img src="images/M.png" alt="morocco map" width={100} style={{ marginTop: "10px" }} /></Link>
        </div>

        {/* Right Side Links */}
        <ul className="navbar-nav d-flex flex-row right gap-5">
          <li className="nav-item">
            <Link className={`nav-link  fs-5 ${scrolled ? 'scrolled' : ''}`} to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link  fs-5 ${scrolled ? 'scrolled' : ''}`} to="/signup">Sign up</Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link  fs-5 ${scrolled ? 'scrolled' : ''}`} to="/Book-Table">Book A Table</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
