"use client"
import { useState, useEffect } from "react"
import styles from "./hero.module.css"
import { Link } from "react-router-dom"

const slides = [
  {
    id: 1,
    image: "../../../images/1.png",
    title: "Celebrate with KM O",
    subtitle: "Events Designed to Delight",
    description: "Exceptional catering for unforgettable events",
    btn: '/Event',
    btnT: 'View Event',
  },
  {
    id: 2,
    image: "../../../images/2.png",
    title: "Taste the Tradition",
    subtitle: "A Symphony of Sweet Heritage",
    description: "Handcrafted pastries made with passion",
    btn: '/Event',
    btnT: 'View Patisserie',
  },
  {
    id: 3,
    image: "../../../images/3.png",
    title: "KM O Café",
    subtitle: "Where Every Sip Inspires",
    description: "Your daily retreat for coffee and conversation",
    btn: '/Event',
    btnT: 'View Menu',
  },
  {
    id: 4,
    image: "../../../images/4.png",
    title: "Flavors of Morocco",
    subtitle: "From Tangier to Your Table",
    description: "Experience the warmth of Tangier through every bite",
    btn: '/Event',
    btnT: 'View Menu',
  }
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className={styles.heroSection}>
      {slides.map((slide, index) => (
        <div key={slide.id} className={`${styles.slide} ${index === currentSlide ? styles.activeSlide : ""}`}>
          <div className={styles.overlay} />
            <img
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              className={styles.slideImage}
            />
          <div className={styles.slideContent}>
            <div className={`${styles.subtitle} ${index === currentSlide ? styles.animateSubtitle : ""}`}>
              <span>{slide.subtitle}</span>
            </div>
            <h1 className={`${styles.title} ${index === currentSlide ? styles.animateTitle : ""}`}>{slide.title}</h1>
            <p className={`${styles.description} ${index === currentSlide ? styles.animateDescription : ""}`}>{slide.description}</p>
            <div className={styles.menuButton}>
              <Link to={slide.btn} className={styles.linkk}>
                {slide.btnT}
              </Link>
            </div>
          </div>
        </div>
      ))}

      <div className={styles.slideIndicators}>
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`${styles.indicator} ${index === currentSlide ? styles.activeIndicator : ""}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}