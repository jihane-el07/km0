import { Link } from "react-router-dom"
import styles from "./PatissierHero.module.css"
import { useState } from "react"
import { CarrotIcon, ShoppingBag, ShoppingCart } from "lucide-react"

const PatissierHero = ({ cartCount, totalPrice }) => {

    const [dropdownOpen, setDropdownOpen] = useState({
      produits: false,
      creations: false,
    })
  
    const toggleDropdown = (menu) => {
      setDropdownOpen({
        ...dropdownOpen,
        [menu]: !dropdownOpen[menu],
      })
    }
  return (
    <div className={styles.hero}>
        <header className={styles.header}>
        <nav className={styles.mainNav}>
          <ul>
            <li className={styles.active}>
              <Link to="/">Home</Link> 
            </li>
            <li>
              <Link to="/Products">Viennoiserie</Link> 
            </li>
            <li>
              <Link to="/">Bakery</Link> 
            </li>
            <li>
             <Link to="/">Pâtisserie</Link>
            </li>
            <li>
              <Link to="/">Ice Cream</Link>
            </li>
            <li>
              <Link to="/">Savoury</Link>
            </li>
             <li>
              <Link to="/">Gourmet creations</Link>
            </li>
          </ul>
        </nav>

        <div className={styles.userActions}>
          <a href="#cart" className={styles.cart}>
            <span>{(totalPrice || 0).toFixed(2)} DH</span>
            <div className={styles.cartIcon}>
              <span className={styles.cartCount}>{cartCount}</span>
              <ShoppingBag className={styles.Icon} />
            </div>
          </a>
        </div>
      </header>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        {/* <h1>The Art of Pastry</h1> */}
        <h1>KM0 Pastries</h1>
        <div className={styles.div}>
        <Link className={styles.Link} to='/'>Home</Link>
        <img src='/images/coffee.png' alt='' />
        <Link className={styles.LinkA} to='/Patisserie'>Pastry shop</Link>
        </div>
      </div>
    </div>
  )
}

export default PatissierHero
