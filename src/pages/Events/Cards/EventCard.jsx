import styles from "./EventCard.module.css"

const EventCard = ({ event }) => {
  const { title, date, time, image, description, category, price } = event

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} />
        <div className={styles.dateOverlay}>
          <span className={styles.day}>{date.day}</span>
          <span className={styles.month}>{date.month}</span>
        </div>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.meta}>
          <span className={styles.time}>{time}</span>
          {price && <span className={styles.price}>{price}</span>}
        </div>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  )
}

export default EventCard
