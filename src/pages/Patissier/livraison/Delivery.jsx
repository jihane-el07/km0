import { CreditCard, Phone, Thermometer, Timer } from "lucide-react"
import styles from "./Delivery.module.css"

const Delivery = () => {
  return (
    <>
     <div className={styles.heading}>
        <h3 className={styles.scriptHeading}>Free Delivery Always Fresh</h3>
        <h2 className={styles.mainHeading}>Free Delivery</h2>
        <div className={styles.divider}>
          <div className={styles.line}></div>
          <span className={styles.icon}>
            <img src="/images/flower.webp" className={styles.featureIcon1} alt="divider" />
          </span>
          <div className={styles.line}></div>
        </div>
      </div>

    <div className={styles.container}>
      <div className={styles.imageSection}>
        <img
          src="/images/livraison.jpg"
          alt=" delivery "
          className={styles.deliveryImage}
        />
      </div>

      <div className={styles.contentSection}>
        <h1 className={styles.h1}>Delivered to Your Door </h1>
        <h2 className={styles.h2}>With Complete Cold Chain Integrity</h2>

        <p className={styles.description}>
          Our dedicated delivery teams ensure your order arrives in perfect condition, right to your freezer. Equipped with the necessary tools and training, they guarantee full respect for the cold chain from our kitchen to your home, preserving the quality and freshness of every product.
        </p>

        <div className={styles.deliveryInfo}>
          <h2 className={styles.deliveryHeading}>KM 0 Delivers to You</h2>
          <p className={styles.deliveryLocation}>Tanger : Every day except Sunday</p>

          <div className={styles.phoneContainer}>
            <div className={styles.phoneIcons}>
              <Phone className={styles.phoneIcon} />
              
            </div>
            <p className={styles.phoneNumber}>06 00 00 00 00</p>
          </div>
        </div>

        <div className={styles.features}>
          <div className={styles.featureItem}>
            <Timer className={styles.featureIcon} />
            <p className={styles.featureText}>Respect des délais de livraison</p>
          </div>

          <div className={styles.featureItem}>
            <CreditCard className={styles.featureIcon} />
            <p className={styles.featureText}>Paiement à la livraison</p>
          </div>

          <div className={styles.featureItem}>
            <Thermometer className={styles.featureIcon} />
            <p className={styles.featureText}>Respect de la chaîne du froid</p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Delivery
