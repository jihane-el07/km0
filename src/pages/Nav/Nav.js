import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Nav.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { ShoppingBag, AlertCircle, X, Plus, Minus } from "lucide-react";
import axios from 'axios';

export default function Nav({ cartCount, totalPrice, onLogout, isAuthenticated, cart, setCart, showCartModal, setShowCartModal, removeFromCart, updateQuantity }) {
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderError, setOrderError] = useState(null);
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

  const handleCheckout = async () => {
    if (!isLoggedIn) {
      setShowCartModal(false);
      navigate('/login');
      return;
    }

    try {
      setIsProcessing(true);
      setOrderError(null);

      const token = localStorage.getItem('token');
      const orderData = {
        items: cart.map(item => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: totalPrice
      };

      const response = await axios.post(
        'https://km0-api.vercel.app/deliveries',
        orderData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 201) {
        // Clear cart after successful order
        setCart([]);
        setShowCartModal(false);
        // Show success message or redirect to order confirmation
        alert('Order placed successfully!');
      }
    } catch (error) {
      console.error('Error creating order:', error);
      setOrderError(error.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setIsProcessing(false);
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
            <Link className="nav-link" to="/">
              <img src="images/M.png" alt="morocco map" width={100} style={{ marginTop: "10px" }} />
            </Link>
          </div>

          {/* Right Side Links */}
          <ul className="navbar-nav d-flex flex-row right gap-4 align-items-center">
            {(location.pathname.startsWith('/Patisserie') ||
              location.pathname === '/Menu' ||
              location.pathname === '/contact' ||
              location.pathname === '/Event' ||
              location.pathname === '/Book-Table') && (
                <li className="nav-item">
                  <button onClick={() => setShowCartModal(true)} className={styles.cart}>
                    <span>{(totalPrice || 0).toFixed(2)} DH</span>
                    <div className={styles.cartIcon}>
                      <span className={styles.cartCount}>{cartCount}</span>
                      <ShoppingBag className={styles.Icon} />
                    </div>
                  </button>
                </li>
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

      {/* Cart Modal */}
      {showCartModal && (
        <div className={styles.cartModalOverlay} onClick={() => setShowCartModal(false)}>
          <div className={styles.cartModal} onClick={e => e.stopPropagation()}>
            <div className={styles.cartModalHeader}>
              <h2>Your Cart</h2>
              <button onClick={() => setShowCartModal(false)} className={styles.closeButton}>
                <X size={24} />
              </button>
            </div>

            <div className={styles.cartItems}>
              {cart.length === 0 ? (
                <p className={styles.emptyCart}>Your cart is empty</p>
              ) : (
                cart.map(item => (
                  <div key={item.id} className={styles.cartItem}>
                    <img src={item.image} alt={item.name} className={styles.cartItemImage} />
                    <div className={styles.cartItemDetails}>
                      <h3>{item.name}</h3>
                      <p className={styles.cartItemPrice}>{item.price.toFixed(2)} DH</p>
                      <div className={styles.quantityControls}>
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                          <Minus size={16} />
                        </button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className={styles.removeButton}
                    >
                      <X size={20} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className={styles.cartFooter}>
                <div className={styles.cartTotal}>
                  <span>Total:</span>
                  <span>{totalPrice.toFixed(2)} DH</span>
                </div>
                {orderError && (
                  <p className={styles.orderError}>{orderError}</p>
                )}
                <button
                  className={styles.checkoutButton}
                  onClick={handleCheckout}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
