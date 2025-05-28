
import { useState } from "react"
import styles from "./Patissier.module.css"
import PatissierHero from "./Hero/PatissierHero"
import Produits from "./Produits/Produits"
import BestSellers from "./Best/BestSellers"
import GourmetSection from "./Section/GourmetSection"
import Delivery from "./livraison/Delivery"

const Patissier = () => {
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
const [cartCount, setCartCount] = useState(0);
const [totalPrice, setTotalPrice] = useState(0);
  
 const addToCart = (price, quantity = 1) => {
  setCartCount(prev => prev + quantity);
  const priceNumber = parseFloat(price.replace(',', '.'));
  setTotalPrice(prev => parseFloat((prev + priceNumber * quantity).toFixed(2)));
};


  return (
    <div className={styles.homePage}>
     <PatissierHero cartCount={cartCount} totalPrice={totalPrice} />
      <Produits  />
      <BestSellers addToCart={addToCart} />
      <GourmetSection />
      <Delivery />
    </div>
  )
}

export default Patissier
