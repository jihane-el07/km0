import React, { useEffect, useRef } from "react";
import styles from "./IntroLayer.module.css"; // Updated to use CSS modules
import { motion } from 'framer-motion';

const IntroLayer = () => {
  const layerRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto"; // Cleanup on unmount
    };
  }, []);

  const handleTravel = () => {
    if (layerRef.current) {
      layerRef.current.style.transition = "transform 8s ease-in-out";
      layerRef.current.style.transform = "translateX(1000vw)";
      setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 1800);
    }
  };

  return (
    <div className={styles.layer} ref={layerRef}>
      <img src="images/avv.png" alt="plane" className={styles.plane} />
      <img src="images/trail.png" alt="plane" className={styles.trail} />
      <img src="images/morocco-map.png" alt="morocco map" className={styles.mrMap}/>
      <motion.div
        className={styles.introMessage}
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{ duration: 3}}
      >
        <h1>Welcome to KM0 </h1>
        <p>where every flavor begins its journey<br /> from Tangier  Morocco to the heart of Africa</p>
        <motion.button
          id="travelBtn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleTravel}
        >
         <span>Travel with us</span> 
        </motion.button>
      </motion.div>
    </div>
  );
};

export default IntroLayer;