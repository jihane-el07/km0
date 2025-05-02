"use client"
import { useState, useEffect } from "react"
import "./hero.css"
const slides = [
  {
    id: 1,
    image: "../../../images/1.png?height=1080&width=1920",
    title: "Welcome to Kudil",
    subtitle: "Fine Dining Experience",
    description: "Discover the art of fine dining with our exquisite menu and elegant atmosphere",
  },
  {
    id: 2,
    image: "../../../images/2.png?height=1080&width=1920",
    title: "Authentic Cuisine",
    subtitle: "Crafted with Passion",
    description: "Our chefs prepare each dish with the finest ingredients and traditional techniques",
  },
  {
    id: 3,
    image: "../../../images/3.png?height=1080&width=1920",
    title: "Special Events",
    subtitle: "Memorable Celebrations",
    description: "Host your special occasions in our beautiful venue with personalized service",
  },
  {
    id: 4,
    image: "../../../images/4.png?height=1080&width=1920",
    title: "Special Events",
    subtitle: "Memorable Celebrations",
    description: "Host your special occasions in our beautiful venue with personalized service",
  },
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 6000)
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
            fill
            className="slide-image"
            priority={index === 0}
          />

          <div className="slide-content">
            <div className={`subtitle ${index === currentSlide ? "animate-subtitle" : ""}`}>
              <span>{slide.subtitle}</span>
            </div>

            <h1 className={`title ${index === currentSlide ? "animate-title" : ""}`}>{slide.title}</h1>

            <p className={`description ${index === currentSlide ? "animate-description" : ""}`}>{slide.description}</p>

            <div className={`button-wrapper ${index === currentSlide ? "animate-button" : ""}`}>
              <a href="/menu" className="menu-button">
                View Our Menu
              </a>
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
