import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function Nav() {
  return (
    <nav className="navbar navbar-expand-sm">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Left Side Links */}
        <ul className="navbar-nav d-flex flex-row gap-3">
          <li className="nav-item">
            <Link className="nav-link  fs-5" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link  fs-5" to="/Event">Event</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link  fs-5" to="/Patissier">Patissier</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link fs-5" to="/Reservation">Menu</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link  fs-5" to="/contact">Contact Us</Link>
          </li>
        </ul>

        {/* Centered Logo */}
        <div className="text-center">
          <img src="images/M.png" alt="morocco map" className="mr-map" width={100} style={{ marginTop: "10px" }} />
        </div>

        {/* Right Side Links */}
        <ul className="navbar-nav d-flex flex-row gap-3">
          <li className="nav-item">
            <Link className="nav-link  fs-5" to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link  fs-5" to="/signup">Sign up</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link fs-5" to="/Book-Table">Book A Table</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
