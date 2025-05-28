import { ChevronRight } from "lucide-react"
import styles from "./Breadcrumb.module.css"

const Breadcrumb = () => {
  return (
    <nav className={styles.breadcrumb}>
      <div className={styles.container}>
        <a href="#" className={styles.breadcrumbLink}>
          ACCUEIL
        </a>
        <ChevronRight className={styles.separator} />
        <span className={styles.breadcrumbCurrent}>BOULANGERIE</span>
      </div>
    </nav>
  )
}

export default Breadcrumb
