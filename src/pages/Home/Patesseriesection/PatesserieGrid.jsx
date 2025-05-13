"use client"

import styles from "./PatesserieGrid.module.css"

const cuisines = [
  {
    id: 1,
    name: null,
    image: "/images/pa1.png",
    icon: null,
  },
  {
    id: 2,
    name: "French Cuisine",
    image: "/images/pa3.png",
    icon: "briouat",
  },
  {
    id: 3,
    name: null,
    image: "/images/pa5.png",
    icon: null,
  },
  {
    id: 4,
    name: "Italian Cuisine",
    image: "/images/pa7.png",
    icon: "kaab_el_ghazal",
  },
  {
    id: 5,
    name: "Chinese Cuisine",
    image: "/images/pa2.png",
    icon: "croissant",
  },
  {
    id: 6,
    name: null,
    image: "/images/pa4.png",
    icon: null,
  },
  {
    id: 7,
    name: "Mexican Cuisine",
    image: "/images/pa6.png",
    icon: "cake",
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
        {iconType === "croissant" && (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 12C2 15.31 4.69 18 8 18C8 14.69 5.31 12 2 12ZM22 12C22 15.31 19.31 18 16 18C16 14.69 18.69 12 22 12ZM8 6C4.69 6 2 8.69 2 12C5.31 12 8 9.31 8 6ZM16 6C19.31 6 22 8.69 22 12C18.69 12 16 9.31 16 6ZM9 12C9 14.21 10.79 16 13 16C13 13.79 11.21 12 9 12ZM15 12C15 14.21 16.79 16 19 16C19 13.79 17.21 12 15 12Z" fill="#E0C675"/>
          </svg>
        )}
        {iconType === "cake" && (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C11.17 2 10.5 2.67 10.5 3.5C10.5 4.33 11.17 5 12 5C12.83 5 13.5 4.33 13.5 3.5C13.5 2.67 12.83 2 12 2ZM18 6H6V8H18V6ZM5 10V21H19V10H5ZM17 19H7V12H17V19Z" fill="#E0C675"/>
          </svg>
        )}
        {iconType === "briouat" && (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4L20 4L12 20L4 4Z" fill="#E0C675"/>
          </svg>
        )}
        {iconType === "kaab_el_ghazal" && (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12H18C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12H4Z" fill="#E0C675"/>
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
