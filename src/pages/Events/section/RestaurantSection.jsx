import React from 'react';
import styles from './RestaurantSection.module.css';

const RestaurantSection = () => {
  const eventsData = [
    {
      id: 1,
      title: "Marriage Proposal",
      image: "/images/proposal.jpg",
      description: "Turn your special question into a magical moment at Km0. In the heart of Tangier, we craft  elegant settings with romantic décor, candlelit dining, and customized details. Let our team help you create a memory to cherish forever.",
    },
    {
      id: 2,
      title: "Birthday Parties",
      image: "/images/birth.jpg",
      description: "Celebrate life’s milestones with flavor and flair. From children’s birthdays to elegant soirées for adults, Km0 offers themed decorations, custom cakes, and special menus—all in a warm, stylish Moroccan-Mediterranean setting.",
    },
    {
      id: 3,
      title: "Corporate Events",
      image: "/images/ramadan.jpg",
      description: "Where professionalism meets authentic hospitality. Whether it’s a business lunch, team dinner, or strategy meeting, Km0 provides flexible private spaces, curated menus, and a refined atmosphere to impress your colleagues and clients.",
    },
    {
      id: 4,
      title: "Private Dinners",
      image: "/images/eid.jpg",
      description: "Exclusivity, flavor, and comfort—all in one table. Enjoy a romantic dinner for two or host a discreet business meal in one of our private areas. Our seasonal dishes and warm service offer a truly personalized dining experience.",
    },
    
  ]
  


  return (
    
    <div className={styles.container}>
      <div className={styles.mainContent}>
              <div className={styles.textSection}>
              <h1 className={styles.title}>Marriage Proposal</h1>
              <div className={styles.divider}>
                <span className={styles.dividerLine}></span>
                <span className={styles.dividerIcon}></span>
              </div>
                <p className={styles.description}>Turn your special question into a magical moment at Km0. In the heart of Tangier, we craft  elegant settings with romantic décor, candlelit dining, and customized details. Let our team help you create a memory to cherish forever.</p>
                <div className={styles.btn}>
                  <button className={`${styles.btnPrimary} font-lora`}>Book Now </button> 
                </div>
              </div>
              <div className={styles.imageSection}>
                <div className={styles.border}>
                      <img src="/images/proposal.jpg" alt='Marriage Proposal' className={styles.mainImage} />
                </div>
              </div>  
      </div>

      <div className={styles.mainContent2}>
              <div className={styles.textSection}>
              <h1 className={styles.title}>Birthday Parties</h1>
              <div className={styles.divider}>
                <span className={styles.dividerLine}></span>
                <span className={styles.dividerIcon}></span>
              </div>
                <p className={styles.description}>Celebrate life’s milestones with flavor and flair. From children’s birthdays to elegant soirées for adults, Km0 offers themed decorations, custom cakes, and special menus—all in a warm, stylish Moroccan-Mediterranean setting.</p>
                <div className={styles.btn}>
                  <button className={`${styles.btnPrimary} font-lora`}>Book Now</button> 
                </div>
              </div>
              <div className={styles.imageSection}>
                <div className={styles.border}>
                      <img src="/images/birth.jpg" alt='Birthday Parties' className={styles.mainImage} />
                </div>
              </div>  
      </div>

      <div className={styles.mainContent}>
              <div className={styles.textSection}>
              <h1 className={styles.title}>Corporate Events</h1>
              <div className={styles.divider}>
                <span className={styles.dividerLine}></span>
                <span className={styles.dividerIcon}></span>
              </div>
                <p className={styles.description}>Where professionalism meets authentic hospitality. Whether it’s a business lunch, team dinner, or strategy meeting, Km0 provides flexible private spaces, curated menus, and a refined atmosphere to impress your colleagues and clients.</p>
                <div className={styles.btn}>
                  <button className={`${styles.btnPrimary} font-lora`}>Book Now</button> 
                </div>
              </div>
              <div className={styles.imageSection}>
                <div className={styles.border}>
                      <img src="/images/event.jpg" alt='Corporate Events' className={styles.mainImage} />
                </div>
              </div>  
      </div>

      <div className={styles.mainContent2}>
              <div className={styles.textSection}>
              <h1 className={styles.title}>Private Dinners</h1>
              <div className={styles.divider}>
                <span className={styles.dividerLine}></span>
                <span className={styles.dividerIcon}></span>
              </div>
                <p className={styles.description}>Exclusivity, flavor, and comfort—all in one table. Enjoy a romantic dinner for two or host a discreet business meal in one of our private areas. Our seasonal dishes and warm service offer a truly personalized dining experience.</p>
                <div className={styles.btn}>
                  <button className={`${styles.btnPrimary} font-lora`}>Book Now</button> 
                </div>
              </div>
              <div className={styles.imageSection}>
                <div className={styles.border}>
                      <img src="/images/private.jpg" alt='Private Dinners' className={styles.mainImage} />
                </div>
              </div>  
      </div>
    </div>
  );
};

export default RestaurantSection;