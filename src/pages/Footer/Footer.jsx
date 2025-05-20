import styles from "./Footer.module.css"
import { Facebook, Twitter, Send } from "lucide-react"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>
        <div className={styles.socialSection}>
          <p className={styles.followText}>FOLLOW US :</p>
          <div className={styles.socialIcons}>
            <a href="" aria-label="Facebook">
              <Facebook size={18} />
            </a>
            <a href="" aria-label="Twitter">
              <Twitter size={18} />
            </a>
            <a href="" aria-label="Google Plus">
              <span className={styles.googlePlus}>G+</span>
            </a>
          </div>
        </div>

        <div className={styles.logoSection}>
          <h2 className={styles.logo}>KM O</h2>
        </div>

        <div className={styles.subscribeSection}>
          <div className={styles.emailInput}>
            <input type="email" placeholder="Your Email Address" />
            <button type="submit" aria-label="Submit">
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.infoSection}>
        <div className={styles.addressSection}>
          <h3>Address</h3>
          <p>Tangier</p>
          <p>Morroco</p>
        </div>

        <div className={styles.timingSection}>
          <h3 className={styles.goldHeading}>Open Timing</h3>
          <div className={styles.timingDivider}></div>
          <p>Monday - Friday</p>
          <p className={styles.timeText}>9 am - 11 pm</p>
          <p className={styles.mealText}>(Breakfast, Lunch, Dinner)</p>
        </div>

        <div className={styles.contactSection}>
          <h3>Contact Us</h3>
          <p>KM0@gmail.com</p>
          <p>+212 612345678</p>
        </div>
      </div>

      <div className={styles.copyrightSection}>
        <p>© 2025. ALL RIGHTS RESERVED BY KM0.</p>
      </div>
    </footer>
  )
}

export default Footer
