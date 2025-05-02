import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function Nav() {
  return (
    <nav className="navbar navbar-expand-sm">
      <div className="container-fluid d-flex justify-content-around align-items-center">
        {/* Left Side Links */}
        <ul className="navbar-nav left d-flex flex-row gap-3">
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
        <Link className="nav-link" to="/"><img src="images/M.png" alt="morocco map" width={100} style={{ marginTop: "10px" }} /></Link>
        </div>

        {/* Right Side Links */}
        <ul className="navbar-nav d-flex flex-row right gap-5">
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
