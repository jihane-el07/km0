import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Nav.module.css';
import { Menu, X, ShoppingCart, LogOut } from 'lucide-react';

export default function Nav({ cartCount, totalPrice, onLogout, isAuthenticated }) {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        onLogout();
        setIsOpen(false);
    };

    return (
        <nav className={styles.navbar}>
            <div className={styles.navContainer}>
                <Link to="/" className={styles.logo}>
                    <img src="/logo.png" alt="KM0 Logo" />
                </Link>

                <div className={styles.menuIcon} onClick={toggleMenu}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </div>

                <div className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
                    {isAuthenticated ? (
                        <>
                            <Link to="/verification" className={styles.navLink}>
                                Verification
                            </Link>
                            <button onClick={handleLogout} className={styles.logoutButton}>
                                <LogOut size={20} />
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/Menu" className={styles.navLink}>Menu</Link>
                            <Link to="/Event" className={styles.navLink}>Events</Link>
                            <Link to="/Patisserie" className={styles.navLink}>Patisserie</Link>
                            <Link to="/Book-Table" className={styles.navLink}>Book Table</Link>
                            <Link to="/Contact" className={styles.navLink}>Contact</Link>
                            <Link to="/login" className={styles.navLink}>Login</Link>
                        </>
                    )}
                </div>

                {!isAuthenticated && (
                    <Link to="/Patisserie" className={styles.cartIcon}>
                        <ShoppingCart size={24} />
                        {cartCount > 0 && <span className={styles.cartCount}>{cartCount}</span>}
                        {totalPrice > 0 && <span className={styles.cartPrice}>${totalPrice.toFixed(2)}</span>}
                    </Link>
                )}
            </div>
        </nav>
    );
} 