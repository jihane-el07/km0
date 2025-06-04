import styles from "./GourmetSection.module.css"

function GourmetSection() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.imageContainer}>
            <img
              src="/images/section.PNG"
              alt="Assortment of gourmet cakes including a strawberry tart, chocolate cake, and fruit-topped pastry"
              className={styles.image}
            />
          </div>

          <div className={styles.content}>
            <h3 className={styles.subtitle}>Gourmet creations</h3>
            <h2 className={styles.title}>ENJOY HOSTING!</h2>
            <p className={styles.description}>
              A gathering? An event? Frozy delivers all your cakes and desserts to delight your guests for sure! A menu of à la carte products to make your receptions as delicious as they are unforgettable — all delivered to your doorstep!
            </p>
            <div className={styles.btn}>
                <button className={`${styles.btnPrimary} font-lora`}>Discover the range</button> 
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default GourmetSection
