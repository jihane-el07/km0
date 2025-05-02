"use client"
import { useState, useEffect } from "react"
import "./hero.css"
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
    <section className="hero-section">
      {slides.map((slide, index) => (
        <div key={slide.id} className={`slide ${index === currentSlide ? "active-slide" : ""}`}>
          <div className="overlay" />
            <img
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              className="slide-image"
            />
          <div className="slide-content">
            <div className={`subtitle ${index === currentSlide ? "animate-subtitle" : ""}`}>
              <span>{slide.subtitle}</span>
            </div>
            <h1 className={`title ${index === currentSlide ? "animate-title" : ""}`}>{slide.title}</h1>
            <p className={`description ${index === currentSlide ? "animate-description" : ""}`}>{slide.description}</p>
            <div className="menu-button">
              <Link to={slide.btn} className="linkk">
                {slide.btnT}
              </Link>
            </div>
          </div>
        </div>
      ))}

      <div className="slide-indicators">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`indicator ${index === currentSlide ? "active-indicator" : ""}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
