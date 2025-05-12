"use client"

import { useState } from "react"
import styles from "./seasonal-menu.module.css"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import ImageModal from "./ImageModal.jsx"

export default function SeasonalMenu() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const images = ["images/m1.png", "images/m2.png", "images/m3.png", "images/m4.png", "images/m5.png", "images/m6.png"]

  const openModal = (index) => {
    setCurrentImageIndex(index)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <motion.div className={styles.container}>
      <div className={styles.leftSection}>
        <div className={styles.textContent}>
          <h2 className={styles.heading}>
            <span className={styles.embracing}>Embracing</span>
            <span className={styles.seasonalMenus}>Seasonal Menus</span>
          </h2>
          <div className={styles.divider}>
            <span className={styles.line}></span>
            <span className={styles.ornament}></span>
            <span className={styles.line}></span>
          </div>
          <p className={styles.description}>
            Discover the essence of each season through our thoughtfully crafted menus. From fresh spring vegetables to
            cozy winter flavors, every dish is designed to celebrate nature's bounty at its peak. Taste the harmony of
            seasonal ingredients, expertly prepared to bring warmth, freshness, and flavor to your table.
          </p>

          <Link to="/Menu">
            <div className={styles.btn}>
              <button className={`${styles.btnPrimary} font-lora`}>View Menu</button>
            </div>
          </Link>
        </div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.foodGrid}>
          {images.map((image, index) => (
            <div key={index} className={styles.foodItem} onClick={() => openModal(index)}>
              <img src={image || "/placeholder.svg"} className={styles.img} alt={`Food item ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <ImageModal
          images={images}
          currentIndex={currentImageIndex}
          onClose={closeModal}
          setCurrentIndex={setCurrentImageIndex}
        />
      )}
    </motion.div>
  )
}
