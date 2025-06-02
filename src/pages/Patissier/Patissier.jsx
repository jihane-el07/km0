
import { useState } from "react"
import styles from "./Patissier.module.css"
import PatissierHero from "./Hero/PatissierHero"
import Produits from "./Produits/Produits"
import BestSellers from "./Best/BestSellers"
import GourmetSection from "./Section/GourmetSection"
import Delivery from "./livraison/Delivery"

const Patissier = ({ addToCart }) => 
 {



  return (
    <div className={styles.homePage}>
     <PatissierHero/>
      <Produits  />
      <BestSellers addToCart={addToCart} />
      <GourmetSection />
      <Delivery />
    </div>
  )
}

export default Patissier
