"use client"

import { useState, useEffect } from "react"
import styles from "./Section2.module.css"

export default function RestaurantSection() {
  const [counts, setCounts] = useState({
    customers: 0,
    awards: 0,
    photos: 0,
    clients: 0,
  })

  useEffect(() => {
    // Animate the counters on component mount
    const animateCounters = () => {
      const duration = 5000 // 2 seconds
      const targetCounts = {
        customers: 7254,
        awards: 1276,
        photos: 386,
        clients: 239,
      }

      const startTime = Date.now()

      const updateCounters = () => {
        const currentTime = Date.now()
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)

        setCounts({
          customers: Math.floor(targetCounts.customers * progress),
          awards: Math.floor(targetCounts.awards * progress),
          photos: Math.floor(targetCounts.photos * progress),
          clients: Math.floor(targetCounts.clients * progress),
        })

        if (progress < 1) {
          requestAnimationFrame(updateCounters)
        }
      }

      requestAnimationFrame(updateCounters)
    }

    animateCounters()
  }, [])

  return (
    <section className={styles.restaurantSection}>
      <div className={styles.header}>
        <a href="#cc" className={styles.arrowDown} >
          <svg width="100" height="50" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 10L12 15L17 10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7 22L12 27L17 22" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      <div className={styles.contentContainer} id="cc">
        <div className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            <img
              src="/placeholder.svg?height=400&width=300"
              alt="Chefs working in Kudil Restaurant kitchen"
              width={300}
              height={400}
              className={styles.chefImage}
            />
            <div className={styles.imageCaption}>Taste the real life</div>
          </div>
        </div>

        <div className={styles.infoContainer}>
          <h2 className={styles.restaurantName}>Kudil Restaurant</h2>
          <p className={styles.restaurantDescription}>
            Discover an extraordinary culinary experience. Our elegant restaurant has been crafted to provide a perfect
            venue for all occasions. From the rich, sophisticated decor to the attentive service, everything is designed
            to make your dining experience unforgettable.
          </p>
          <div className={styles.signatureContainer}>
            <img
              src="/placeholder.svg?height=50&width=120"
              alt="James Travis Signature"
              width={120}
              height={50}
              className={styles.signature}
            />
            <div className={styles.chefName}>JAMES TRAVIS</div>
          </div>
        </div>
      </div>

      <div className={styles.statsContainer}>
        <div className={styles.statItem}>
          <div className={styles.statIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                stroke="#B8860B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                stroke="#B8860B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className={styles.statNumber}>{counts.customers}</div>
          <div className={styles.statLabel}>Happy Customers</div>
        </div>

        <div className={styles.statItem}>
          <div className={styles.statIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z"
                stroke="#B8860B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.21 13.89L7 23L12 20L17 23L15.79 13.88"
                stroke="#B8860B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className={styles.statNumber}>{counts.awards}</div>
          <div className={styles.statLabel}>Awards Won</div>
        </div>

        <div className={styles.statItem}>
          <div className={styles.statIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z"
                stroke="#B8860B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z"
                stroke="#B8860B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className={styles.statNumber}>{counts.photos}</div>
          <div className={styles.statLabel}>Photos Uploaded</div>
        </div>

        <div className={styles.statItem}>
          <div className={styles.statIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999"
                stroke="#B8860B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 4L12 14.01L9 11.01"
                stroke="#B8860B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className={styles.statNumber}>{counts.clients}</div>
          <div className={styles.statLabel}>Satisfied Clients</div>
        </div>
      </div>

      <div className={styles.aboutSection}>
        <h3 className={styles.aboutHeading}>Everything You Need</h3>
        <h2 className={styles.aboutTitle}>About Us</h2>
      </div>
    </section>
  )
}