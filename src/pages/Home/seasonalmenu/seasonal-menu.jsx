import styles from "./seasonal-menu.module.css"
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
export default function SeasonalMenu() {
  return (
    <motion.div className={styles.container}>
      <div className={styles.leftSection}>
        <div className={styles.textContent}>
          <h2 className={styles.heading}>
            <span className={styles.embracing}>Embracing</span>
            <span className={styles.seasonalMenus}>Seasonal Menus</span>
          </h2>
          <div className={styles.divider}>
            <span className={styles.line}></span>
            <span className={styles.ornament}></span>
            <span className={styles.line}></span>
          </div>          <p className={styles.description}>
            Discover the essence of each season through our thoughtfully crafted menus. From fresh spring vegetables to cozy winter flavors, every dish is designed to celebrate nature’s bounty at its peak. Taste the harmony of seasonal ingredients, expertly prepared to bring warmth, freshness, and flavor to your table.
          </p>

          <Link to='/Menu'>
          <div className={styles.btn}>
            <button className={`${styles.btnPrimary} font-lora`}>View Menu</button>
          </div>
          </Link>
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.foodGrid}>
          <div
            className={styles.foodItem}
          ><img src="images/m1.png" className={styles.img} alt="" /></div>
          <div
            className={styles.foodItem}
          ><img src="images/m2.png" className={styles.img} alt="" /></div>
          <div
            className={styles.foodItem}
          ><img src="images/m3.png" className={styles.img} alt="" /></div>
          <div
            className={styles.foodItem}
          ><img src="images/m4.png" className={styles.img} alt="" /></div>
          <div
            className={styles.foodItem}
          ><img src="images/m5.png" className={styles.img} alt="" /></div>
          <div
            className={styles.foodItem}
          ><img src="images/m6.png" className={styles.img} alt="" /></div>
        </div>
      </div>
    </motion.div>
  )
}
