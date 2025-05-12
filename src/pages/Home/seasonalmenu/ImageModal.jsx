"use client"

import { useState, useEffect } from "react"
import styles from "./ImageModal.module.css"

export default function ImageModal({ images, currentIndex, onClose, setCurrentIndex }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Prevent scrolling when modal is open
    document.body.style.overflow = "hidden"

    // Add keyboard event listeners
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") handlePrevious()
      if (e.key === "ArrowRight") handleNext()
      if (e.key === "Escape") onClose()
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = "auto"
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  useEffect(() => {
    setIsLoading(true)
  }, [currentIndex])

  const handlePrevious = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length)
  }

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % images.length)
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* Close button */}
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>

        {/* Main image container */}
        <div className={styles.imageContainer}>
          {isLoading && (
            <div className={styles.loadingIndicator}>
              <div className={styles.spinner}></div>
            </div>
          )}
          <img
            src={images[currentIndex] || "/placeholder.svg"}
            alt={`Food image ${currentIndex + 1}`}
            className={styles.mainImage}
            onLoad={() => setIsLoading(false)}
          />
          <div className={styles.thumbnailContainer}>
          {images.map((image, index) => (
            <button
              key={index}
              className={`${styles.thumbnail} ${index === currentIndex ? styles.activeThumbnail : ""}`}
              onClick={() => setCurrentIndex(index)}
            >
              <img src={image || "/placeholder.svg"} alt={`Thumbnail ${index + 1}`} />
            </button>
          ))}
        </div>
        {/* Navigation buttons */}
        <button className={styles.navButton + " " + styles.prevButton} onClick={handlePrevious}>
          ‹
        </button>
        <button className={styles.navButton + " " + styles.nextButton} onClick={handleNext}>
          ›
        </button>
        </div>
        {/* Caption and counter */}
        <div className={styles.captionContainer}>
          <p className={styles.counter}>
            {currentIndex + 1}/{images.length}
          </p>
        </div>
      </div>
    </div>
  )
}
