
import { useState } from "react"
import { Search, ChevronDown, ChevronRight } from "lucide-react"
import styles from "./Sidebar.module.css"
import { useNavigate } from "react-router-dom"

const Sidebar = () => {
  const [priceRange, setPriceRange] = useState([10, 50])
  const navigate = useNavigate()

  const categories = [
    { name: "Boulangerie", link: "/Boulangerie" },
    { name: "Viennoiserie", link: "/Viennoiserie" },
    { name: "Patissier", link: "/Patissier" },
    { name: "Glaces", link: "/Glaces" },
    { name: "Sales", link: "/Sales" },
    { name: "Gourmet Creations", link: "/Gourmandes" },
  ]
const handleCategoryClick = (category) => {
    navigate(category.link)
  }
  return (
    <aside className={styles.sidebar}>

      {/* Product Categories */}
      <div className={styles.categoriesSection}>
        <h3 className={styles.categoriesTitle}>NOS PRODUITS</h3>

        <div className={styles.categoryGroup}>
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
      </div>
    </aside>
  )
}

export default Sidebar
