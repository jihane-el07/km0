"use client"

import { useEffect, useState, useRef } from "react"
import { Home, Award, Clock, Key,HandPlatter  } from "lucide-react"
import styles from "./stats-counter.module.css"

export default function StatsCounter() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect()
      }
    }
  }, [])

  return (
    <div ref={sectionRef} className={styles.statsSection}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <StatItem
            icon={<Home className={styles.icon} />}
            value={7254}
            label="Happy Customers"
            isVisible={isVisible}
          />
          <StatItem icon={<HandPlatter  className={styles.icon} />} value={250} label={<>Delicious<br />Tasty Recipes</>} isVisible={isVisible} />
          <StatItem icon={<Award className={styles.icon} />} value={1276} label="Awards Won" isVisible={isVisible} />
          <StatItem icon={<Clock className={styles.icon} />} value={386} label="Hours Worked" isVisible={isVisible} />
          <StatItem icon={<Key className={styles.icon} />} value={239} label="Services Done" isVisible={isVisible} />
        </div>
      </div>
    </div>
  )
}

function StatItem({ icon, value, label, isVisible }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return 
    const duration = 2000 
    const steps = 50 
    const stepValue = value / steps 
    let currentStep = 0
    setCount(0)
    const timer = setInterval(() => {
      currentStep += 1
      setCount(Math.min(Math.floor(stepValue * currentStep), value))

      if (currentStep >= steps) {
        clearInterval(timer)
        setCount(value)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [isVisible, value]) 
  return (
    <div className={styles.statItem}>
      {icon}
      <div className={styles.numberContainer}>
        <span className={styles.number}>{count}</span>
      </div>
      <div className={styles.divider}></div>
      <p className={styles.label}>{label}</p>
    </div>
  )
}
