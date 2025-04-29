import React, { useEffect } from "react";
import "./IntroLayer.css"; // Use this if you're keeping the original CSS

const IntroLayer = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto"; // Cleanup on unmount
    };
  }, []);

  const handleTravel = () => {
    const layer = document.querySelector(".layer");
    layer.style.transition = "transform 8s ease-in-out";
    layer.style.transform = "translateX(1000vw)";
    setTimeout(() => {
      document.body.style.overflow = "auto";
    }, 1800);
  };

  return (
    <div className="layer">
      <img src="images/avv.png" alt="plane" className="plane" />
      <img src="images/morocco-map.png" alt="morocco map" className="mr-map" />
      <div className="intro-message">
        <h1>Welcome to KM0</h1>
        <p>Travel with us and discover Morocco</p>
        <button id="travelBtn" onClick={handleTravel}>
          Travel
        </button>
      </div>
    </div>
  );
};

export default IntroLayer;
