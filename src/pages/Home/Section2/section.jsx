import styles from "./section.module.css"
import { useRef } from 'react';

const RestaurantSection2 = () => {
  const historyRef = useRef(null);
  const scrollToHistory = () => {
    historyRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className={styles.restaurantContainer}  id="History" ref={historyRef}>
      <div className={styles.header}>
        <div onClick={scrollToHistory} className={styles.arrowDown} style={{ cursor: 'pointer' }}>
          <svg width="100" height="50" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 10L12 15L17 10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7 22L12 27L17 22" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      {/* History Section */}
      <div className={styles.historySection}>
        <div className={styles.contentLeft}>
          <h3 className={`${styles.subtitle} font-great-vibes`}>The Soul of</h3>
          <h2 className={`${styles.title} font-playfair`}>Km0 Tangier</h2>
          <div className={styles.divider}>
            <span className={styles.line}></span>
            <span className={styles.ornament}></span>
            <span className={styles.line}></span>
          </div>
          <p className={`${styles.description} font-lora`}>
            Nestled in the heart of Tangier, Km0 is more than just a restaurant—it's a celebration of Moroccan heritage and Mediterranean freshness. From the spice markets of the Medina to the waves of the Atlantic, we draw inspiration from our surroundings to craft seasonal dishes with ingredients sourced within our region. Every meal is a tribute to our land, culture, and people.
          </p>
          <div>
            <div className={styles.btn}>
              <button className={`${styles.btnPrimary} font-lora`}>Our Story</button>
            </div>
          </div>
          
        </div>
        <div className={styles.contentRight}>
          <div className={styles.imageFrame1}>
            <img
              src="images/p1.png?height=400&width=500"
              alt="Tangier-style Moroccan restaurant interior"
              className={styles.restaurantImage1}
            />
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section className={styles.servicesSection}>
        <div className={styles.contentRight}>
          <h3 className={`${styles.subtitle} font-great-vibes`}>Authentic</h3>
          <h2 className={`${styles.title} font-playfair`}>Our Experience</h2>
          <div className={styles.divider}>
            <span className={styles.line}></span>
            <span className={styles.ornament}></span>
            <span className={styles.line}></span>
          </div>
          <p className={`${styles.description} font-lora`}>
            At Km0, we offer a unique culinary journey through northern Morocco. Our menu blends traditional recipes like tagines and zaalouk with modern flair, all made with local, organic ingredients. Whether you're dining in our riad-style interior or enjoying the view of the Kasbah, every visit promises warmth, flavor, and a touch of Tangier’s soul.
          </p>
          <div className={styles.btn}>
            <button className={`${styles.btnPrimary} font-lora`}>View More</button> 
          </div>
        </div>
        <div className={styles.contentLeft}>
          <div className={styles.imageFrame2}>
            <img
              src="images/p2.png?height=400&width=500"
              alt="Outdoor Moroccan restaurant with view of Tangier"
              className={styles.restaurantImage2}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default RestaurantSection2
