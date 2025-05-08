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
          <div className={styles.divider}></div>
          <p className={styles.description}>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
            atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.
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
