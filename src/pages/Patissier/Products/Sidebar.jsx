"use client"

import { useState } from "react"
import { Search, ChevronDown, ChevronRight } from "lucide-react"
import styles from "./Sidebar.module.css"
import { useNavigate } from "react-router-dom"

const Sidebar = () => {
  const [priceRange, setPriceRange] = useState([10, 50])
  const [searchTerm, setSearchTerm] = useState("")
  const [expandedCategories, setExpandedCategories] = useState({
    boulangerie: true,
    patisserie: true,
    glaces: true,
    sales: true,
  })


  const navigate = useNavigate()

  const categories = [
    { name: "Boulangerie", link: "/Boulangerie" },
    { name: "Viennoiserie", link: "/Viennoiserie" },
    { name: "Patissier", link: "/Patisserie" },
    { name: "Glaces", link: "/Glaces" },
    { name: "Sales", link: "/Sales" },
    { name: "Gourmet Creations", link: "/Gourmandes" },
  ]
const handleCategoryClick = (category) => {
    navigate(category.link)
  }
  return (
    <aside className={styles.sidebar}>
      {/* Price Filter */}
      <div className={styles.filterSection}>
        <h3 className={styles.filterTitle}>FILTRE PAR PRIX</h3>
        <div className={styles.priceFilter}>
          <div className={styles.priceRange}>
            <input
              type="range"
              min="10"
              max="50"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number.parseInt(e.target.value)])}
              className={styles.rangeSlider}
            />
          </div>
          <div className={styles.priceDisplay}>
            Prix : {priceRange[0]} DH — {priceRange[1]} DH
          </div>
          <button className={styles.filterButton}>FILTRER</button>
        </div>
      </div>


      {/* Product Categories */}
      <div className={styles.categoriesSection}>
        <h3 className={styles.categoriesTitle}>NOS PRODUITS</h3>

        <div className={styles.categoryGroup}>
          {/* <div className={`${styles.categoryItem} ${styles.active}`} onClick={() => toggleCategory("boulangerie")}> */}
            {categories.map((category, index) => (
          <div
            key={index}
            className={styles.categoryItem}
            onClick={() => handleCategoryClick(category)}
          >
            <span className={styles.text}>{category.name}</span>
          </div>
        ))}
          </div>
        {/* </div> */}

      </div>
    </aside>
  )
}

export default Sidebar
