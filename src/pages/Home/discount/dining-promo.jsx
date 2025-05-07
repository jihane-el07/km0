import styles from "./dining-promo.module.css"
import { Link } from "react-router-dom"

const DiningPromo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.tagline}>Enjoy with Family and Friends</h2>
        <div className={styles.discountBox}>
          <h1 className={styles.discount}>25% Discount</h1>
        </div>
        <p className={styles.couponText}>for Family Parties! Coupon 015</p>
        <Link to="/Event" className={styles.reservationLink}>
          <span className={styles.reservationText}>Make a Reservation</span>
        </Link>
      </div>
    </div>
  )
}

export default DiningPromo
