import { ChevronRight } from "lucide-react"
import styles from "./Breadcrumb.module.css"
import products from "../../../data/products.json"
import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

const Breadcrumb = () => {
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
  return (
    <nav className={styles.breadcrumb}>
      <div className={styles.container}>
        <Link to='/' className={styles.breadcrumbLink}>
          ACCUEIL
        </Link>
        <ChevronRight className={styles.separator} />
        <span className={styles.breadcrumbCurrent}>{category}</span>
      </div>
    </nav>
  )
}

export default Breadcrumb
