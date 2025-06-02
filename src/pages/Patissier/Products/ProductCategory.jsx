
import { useEffect, useState } from "react"
import { Grid, List, LayoutGrid, Menu } from "lucide-react"
import styles from "./ProductCategory.module.css"
import { useParams } from "react-router-dom"
import Sidebar from "./Sidebar"
import products from "../../../data/products.json"

const ProductCategory = () => {
  const [viewMode, setViewMode] = useState("grid")
  const { category } = useParams()
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    if (category) {
      const matched = products.filter(
        (product) => product.categorie.toLowerCase() === category.toLowerCase()
      )
      setFilteredProducts(matched)
    }
  }, [category])

  const heroImage = filteredProducts[0]?.imageH || "/images/fallback.jpg"

  return (
    <div className={styles.productGrid}>
      <div className={styles.hero}>
        <img src={`/${heroImage}`} alt={category} className={styles.heroImage} />
        <div className={styles.heroOverlay}>
          <h1 className={styles.heroTitle}>{category}</h1>
        </div>
      </div>
        <div className={`${styles.products} ${styles[viewMode]}`}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <div className={styles.productImage}>
                  <img src={`/${product.image}`} alt={product.name} />
                </div>
                <div className={styles.productInfo}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productUnits}>{product.quantity}</p>
                  <div className={styles.productPrice}>
                    <span className={styles.price}>{product.price}</span>
                    <span className={styles.currency}>DH</span>
                   
                  </div>
                    <button className={styles.commande} >
                      Add to cart
                    </button>
                </div>
              </div>
            ))
          ) : (
            <p>No products found in this category.</p>
          )}
        </div>
      </div>
  )
}

export default ProductCategory
