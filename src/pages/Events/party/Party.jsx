import React, { useEffect, useRef, useState } from 'react';
import styles from './Party.module.css';

export default function Party() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div ref={sectionRef} className={styles.statsSection}>
      <div className={styles.container}>
        {isVisible &&
        <div className={styles.content}>
            <h2 className={styles.Title}>Need Your Best Party</h2>
            <p className={styles.SubTitle}>Events Rooms</p>
        </div>
        }
        
      </div>
      
    </div>
  );
}
