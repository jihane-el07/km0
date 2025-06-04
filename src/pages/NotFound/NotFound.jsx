import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.css';

const NotFound = () => {
    return (
        <div className={styles.notFound}>
            <div className={styles.content}>
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p>Oops! The page you're looking for doesn't exist.</p>
                <Link to="/" className={styles.homeButton}>
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFound; 