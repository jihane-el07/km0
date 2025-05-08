import EventCard from "../Cards/EventCard"
import styles from "./EventList.module.css"

const EventList = ({ events }) => {
  return (
    <div className={styles.eventList}>
      {events.map((event) => (
        <div key={event.id} className={styles.eventItem}>
          <EventCard event={event} />
        </div>
      ))}
    </div>
  )
}

export default EventList
