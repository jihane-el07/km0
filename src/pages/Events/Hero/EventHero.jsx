import { Link } from "react-router-dom"
import styles from "./EventHero.module.css"

const EventHero = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1>Our Events</h1>
        <div className={styles.div}>
        <Link className={styles.Link} to='/'>Home</Link>
        <img src='/images/coffee.png' alt='' />
        <Link className={styles.LinkA} to='/Event'>Event</Link>

        </div>
      </div>
    </div>
  )
}

export default EventHero
