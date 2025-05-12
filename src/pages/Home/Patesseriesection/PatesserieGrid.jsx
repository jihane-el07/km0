"use client"

import React from "react"
import styles from "./PatesserieGrid.module.css"

const cuisines = [
  {
    id: 1,
    name: null, // Japanese cuisine (no label in the image)
    image: "/images/pa1.png",
    icon: null,
  },
  {
    id: 2,
    name: "French Cuisine",
    image: "/images/pa3.png",
    icon: "wine",
  },
  {
    id: 3,
    name: null, // Steak/meat preparation
    image: "/images/pa5.png",
    icon: null,
  },
  {
    id: 4,
    name: "Italian Cuisine",
    image: "/images/pa7.png",
    icon: "beer",
  },
  // Bottom row (4 images)
  {
    id: 5,
    name: "Chinese Cuisine",
    image: "/images/pa2.png",
    icon: "milk",
  },
  {
    id: 6,
    name: null, // Dumplings (no label in the image)
    image: "/images/pa4.png",
    icon: null,
  },
  {
    id: 7,
    name: "Mexican Cuisine",
    image: "/images/pa6.png",
    icon: "taco",
  },
  {
    id: 8,
    name: null, // Additional cuisine
    image: "/images/pa8.png",
    icon: null,
  },
]

export default function PatesserieGrid() {
  const renderIcon = (iconType) => {
    if (!iconType) return null

    return (
      <div className={styles.icon}>
        {iconType === "wine" && (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 13C14.21 13 16 11.21 16 9V3H8V9C8 11.21 9.79 13 12 13ZM12 1H16V2H12V1ZM17 16H13V20H11V16H7C5.9 16 5 16.9 5 18V22H19V18C19 16.9 18.1 16 17 16Z"
              fill="#E0C675"
            />
          </svg>
        )}
        {iconType === "beer" && (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15 19H9V8H15V19ZM16 6H8C7.45 6 7 6.45 7 7V20C7 20.55 7.45 21 8 21H16C16.55 21 17 20.55 17 20V7C17 6.45 16.55 6 16 6ZM18 4H6V2H18V4Z"
              fill="#E0C675"
            />
          </svg>
        )}
        {iconType === "milk" && (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14 7V5C14 3.9 13.1 3 12 3H8C6.9 3 6 3.9 6 5V7H5C3.9 7 3 7.9 3 9V14C3 15.1 3.9 16 5 16H6V19C6 20.1 6.9 21 8 21H12C13.1 21 14 20.1 14 19V16H15C16.1 16 17 15.1 17 14V9C17 7.9 16.1 7 15 7H14ZM8 5H12V7H8V5ZM12 19H8V14H12V19ZM15 14H14V12H8V14H5V9H15V14Z"
              fill="#E0C675"
            />
          </svg>
        )}
        {iconType === "taco" && (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12C21 7.03 16.97 3 12 3ZM12 19C8.14 19 5 15.86 5 12C5 8.14 8.14 5 12 5C15.86 5 19 8.14 19 12C19 15.86 15.86 19 12 19Z"
              fill="#E0C675"
            />
            <path
              d="M12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17Z"
              fill="#E0C675"
            />
          </svg>
        )}
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h3 className={styles.scriptHeading}>Exquisite Pâtisserie Moments</h3>
        <h2 className={styles.mainHeading}>Global Sweet & Savory Bites</h2>
        <div className={styles.divider2}>
          <div className={styles.line}></div>
          <span className={styles.icon2}><img src="/images/flower.webp" className={styles.featureIcon1}/></span>
          <div className={styles.line}></div>
        </div>
      </div>
      <div className={styles.grid}>
        {cuisines.map((cuisine) => (
          <div key={cuisine.id} className={styles.gridItem}>
            <div className={styles.imageContainer}>
              <img src={cuisine.image || "/placeholder.svg"} alt={cuisine.name || "Cuisine"} className={styles.image} />
              {(cuisine.name || cuisine.icon) && (
                <div className={styles.overlay}>
                  {renderIcon(cuisine.icon)}
                  {cuisine.icon && cuisine.name && <div className={styles.divider}></div>}
                  {cuisine.name && <h3 className={styles.cuisineName}>{cuisine.name}</h3>}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
