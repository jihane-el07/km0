import { Link } from "react-router-dom"
import styles from "./Reservation.module.css"
import Formulaire from "./Formulaire/Formulaire"

const Reservation = () => {
  return (
    <div className={styles.container}>
  <div className={styles.hero}>
      <div className={styles.overlay}></div>
        <div className={styles.content}>
            <h1>Reservation</h1>
            <div className={styles.div}>
            <Link className={styles.Link} to='/'>Home</Link>
            <img src='/images/coffee.png' alt='' />
            <Link className={styles.LinkA} to='/Book-Table'>Reservation</Link>
        </div>
      </div>
      </div>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles.mainContent}>
          <div className={styles.contentLeft}>
            <div className={styles.intro}>
              <h3 className={`${styles.subtitle} font-great-vibes`}>Make a Reservation</h3>
              <h2 className={`${styles.title} font-playfair`}>Private Dining & Events</h2>
              <div className={styles.divider}>
                <div className={styles.line}></div>
                <span className={styles.icon}>
                  <img src="/images/flower.webp" className={styles.featureIcon1} alt="divider" />
                </span>
                <div className={styles.line}></div>
              </div>
              <p className={`${styles.description} font-lora`}>
              Whether you're planning an intimate celebration, a corporate gathering, or a special event, our private dining options provide the perfect setting. We offer customized menus, elegant spaces, and exceptional service tailored to your needs. Let us help you create unforgettable moments—reserve your private event with us today.</p>
            </div>
            <div className={styles.phoneSection}>
              <div className={styles.phoneLabel}>Reserved By Phone</div>
              <div className={styles.phoneNumber}>+212 612345678</div>
            </div>
          </div>

          <div className={styles.sidebar}>
            <div className={styles.openingHours}>
              <h3 className={styles.openingTitle}>Open Timing</h3>
              <div className={styles.lineT}></div>
              <div className={styles.timeSlot}>
                <div className={styles.days}>Monday – Friday</div>
                <div className={styles.hours}>9 am – 11 pm</div>
                <div className={styles.meals}>(Breakfast, Lunch, Dinner)</div>
              </div>

              <div className={styles.timeSlot}>
                <div className={styles.days}>Saturday – Sunday</div>
                <div className={styles.hours}>8 am – 12 pm</div>
                <div className={styles.meals}>(Breakfast, Lunch, Dinner)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Online Reservation Section */}
        <section className={styles.onlineReservation}>
          <div className={styles.intro}>
              <h3 className={`${styles.subtitle} font-great-vibes`}>Online Reservation</h3>
              <h2 className={`${styles.title} font-playfair`}>No need to Wait for Table</h2>
              <div className={styles.divider}>
                <div className={styles.line}></div>
                <span className={styles.icon}>
                  <img src="/images/flower.webp" className={styles.featureIcon1} alt="divider" />
                </span>
                <div className={styles.line}></div>
              </div>
            </div>
        </section>
        <Formulaire />
      </main>
    </div>
  )
}

export default Reservation
