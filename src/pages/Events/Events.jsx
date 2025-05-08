
import { useState, useEffect } from "react"

import EventFilter from "./Filter/EventFilter"
import EventList from "./ListCards/EventList"
import styles from "./Events.module.css"
import EventHero from "./Hero/EventHero"
import Party from "./party/Party"




// Sample event data
const eventsData = [
  {
    id: 1,
    title: "Gnawa Rhythms & Henna Night",
    date: { day: "10", month: "June" },
    time: "4:00 PM - 6:00 PM",
    image: "/images/gnawa.jpg",
    description: "Feel the spiritual pulse of traditional Gnawa music with live performances that blend African, Berber, and Arab rhythms. Enjoy Moroccan appetizers and get adorned with beautiful henna art in an authentic and vibrant setting.",
    category: "upcoming",
    price: "75 DH",
  },
  {
    id: 2,
    title: "Live Oud & Couscous Night",
    date: { day: "12", month: "June" },
    time: "4:00 PM - 6:00 PM",
    image: "/images/andalosia.jpg",
    description: "A cultural evening with live traditional music and a couscous feast served family-style.",
    category: "upcoming",
    price: "120 DH",
  },
  {
    id: 3,
    title: "Ramadan Iftar Experience",
    date: { day: "During", month: "Ramadan" },
    time: "8:00 PM - 11:00 PM",
    image: "/images/ramadan.jpg",
    description: "Traditional iftar with harira soup, dates, chebakia, and full Moroccan buffet. Quiet ambiance with soft music and lantern-lit decor.",
    category: "special",
    price: "45 DH",
  },
  {
    id: 4,
    title: "Eid al-Fitr Family Feast",
    date: { day: "Eid ", month: "Day" },
    time: "10:00 AM - 2:00 PM",
    image: "/images/eid.jpg",
    description: "A festive buffet with special dishes like mrouzia, mechoui, and desserts to celebrate Eid with warmth and joy.",
    category: "holiday",
    price: "65 DH",
  },
  {
    id: 5,
    title: "New Year’s Eve",
    date: { day: "31", month: "Dec" },
    time: "6:30 PM - 9:30 PM",
    image: "/images/happy.jpg",
    description: "A luxurious night with a Moroccan fusion dinner, live band, and midnight countdown.",
    category: "holiday",
    price: "85 DH",
  },
  {
    id: 6,
    title: "Yennayer Amazigh New Year",
    date: { day: "14", month: "January" },
    time: "7:00 PM - 9:00 PM",
    image: "/images/amazigh.jpg",
    description: "Celebrate Amazigh heritage with traditional Amazigh dishes, music, and decor honoring Moroccan roots.",
    category: "holiday",
    price: "60 DH",
  },
]

const Events = () => {
  const [filteredEvents, setFilteredEvents] = useState(eventsData)
  const [activeFilter, setActiveFilter] = useState("all")

  useEffect(() => {
    if (activeFilter === "all") {
      setFilteredEvents(eventsData)
    } else {
      setFilteredEvents(eventsData.filter((event) => event.category === activeFilter))
    }
  }, [activeFilter])

  const handleFilterChange = (filter) => {
    setActiveFilter(filter)
  }

  return (
    <div className={styles.eventsPage}>
      <EventHero />
      <div className={styles.container}>
        <div className={styles.intro}>
          <h3 className={`${styles.subtitle} font-great-vibes`}>Gather Taste Celebrate</h3>
          <h2 className={`${styles.title} font-playfair`}>KM0 Events</h2>
          <div className={styles.divider}>
            <span className={styles.line}></span>
            <span className={styles.ornament}></span>
            <span className={styles.line}></span>
          </div>
          <p className={`${styles.description} font-lora`}>
          Discover a world of flavor, creativity, and community through KM0’s curated events. From exclusive culinary experiences to engaging workshops and festive holiday celebrations, there’s always something special happening. Whether you're a food lover, a curious learner, or just looking to celebrate, our events offer something for everyone. Don’t miss out—book early to secure your spot!          </p>
        </div>
       
        

        <EventFilter onFilterChange={handleFilterChange} />

        {filteredEvents.length > 0 ? (
          <EventList events={filteredEvents} />
        ) : (
          <div className={styles.noEvents}>
            <p>No events found in this category. Please check back later or select another category.</p>
          </div>
        )}
        
      </div>
      <Party />
      
      

      
    </div>
  )
}

export default Events
