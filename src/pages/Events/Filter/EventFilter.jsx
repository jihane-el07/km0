"use client"

import { useState } from "react"
import styles from "./EventFilter.module.css"

const EventFilter = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState("all")

  const filters = [
    { id: "all", label: "All Events" },
    { id: "upcoming", label: "Upcoming" },
    { id: "holiday", label: "Holiday Events" },
    { id: "special", label: "Special" },
  ]

  const handleFilterClick = (filterId) => {
    setActiveFilter(filterId)
    onFilterChange(filterId)
  }

  return (
    <div className={styles.filterContainer}>
      <ul className={styles.filterList}>
        {filters.map((filter) => (
          <li
            key={filter.id}
            className={`${styles.filterItem} ${activeFilter === filter.id ? styles.active : ""}`}
            onClick={() => handleFilterClick(filter.id)}
          >
            {filter.label}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default EventFilter
