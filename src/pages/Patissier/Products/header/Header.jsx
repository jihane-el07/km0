import React from 'react'
import styles from "./Header.module.css"
import { Link } from "react-router-dom"

export default function Header() {
  return (
    <div>
      <nav className={styles.mainNav}>
  <ul className={styles.navList}>
    <li className={styles.navItem}>
      <Link to="/" className={styles.navLink}>Home</Link>
    </li>
    <li className={styles.navItem}>
      <Link to="/Products" className={styles.navLink}>Viennoiserie</Link>
    </li>
    <li className={styles.navItem}>
      <Link to="/" className={styles.navLink}>Bakery</Link>
    </li>
    <li className={styles.navItem}>
      <Link to="/" className={styles.navLink}>Pâtisserie</Link>
    </li>
    <li className={styles.navItem}>
      <Link to="/" className={styles.navLink}>Ice Cream</Link>
    </li>
    <li className={styles.navItem}>
      <Link to="/" className={styles.navLink}>Savoury</Link>
    </li>
    <li className={styles.navItem}>
      <Link to="/" className={styles.navLink}>Gourmet creations</Link>
    </li>
  </ul>
</nav>

    </div>
  )
}
