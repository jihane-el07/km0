import { Link } from "react-router-dom"
import styles from "./PatissierHero.module.css"
import { useState } from "react"


const PatissierHero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        {/* <h1>The Art of Pastry</h1> */}
        <h1>KM0 Pastries</h1>
        <div className={styles.div}>
        <Link className={styles.Link} to='/'>Home</Link>
        <img src='/images/coffee.png' alt='' />
        <Link className={styles.LinkA} to='/Patisserie'>Pastry shop</Link>
        </div>
      </div>
    </div>
  )
}

export default PatissierHero
