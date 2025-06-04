import { useNavigate } from "react-router-dom";
import styles from "./Produits.module.css";

export default function Produits() {
  const navigate = useNavigate();

  const features = [
    {
      image: "./images/prd.png",
      title: "BAKERY",
      name: "Boulangerie",
      link: "/Patisserie/Bakery",
      description:
        "Discover our pure sourdough breads—delicious and full of flavor for all your cravings. The perfect companion to your everyday meals.",
    },
    {
      image: "./images/prd1.png",
      title: "VIENNOISERIE",
      name: "Viennoiserie",
      link: "/Patisserie/Viennoiserie",
      description:
        "Pure butter, soft and light, with generous filling. Perfect for your breakfasts, snacks, and sweet breaks.",
    },
    {
      image: "./images/prd2.png",
      title: "PASTRY",
      name: "Pastry ",
      link: "/Patisserie/Pastry",
      description:
        "Crunchy, creamy, crispy, sweet, and full of indulgence... to enjoy with family, friends, or on your own.",
    },
    {
      image: "./images/prd3.png",
      title: "ICE CREAM",
      name: "Glaces",
      link: "/Patisserie/Ice-Creams",
      description:
        "Taste our signature artisanal ice creams — irresistibly smooth, incredibly flavorful, and endlessly creamy.",
    },
    {
      image: "./images/prd4.png",
      title: "SAVOURY",
      name: "Savory",
      link: "/Patisserie/Savory",
      description:
        "Discover our selection of crispy, flavorful savoury treats — perfect to serve and share with your guests.",
    },
    {
      image: "./images/prd5.png",
      title: "GOURMET CREATIONS",
      name: "Gourmet Creations",
      link: "/Patisserie/Gourmandes",
      description:
"Explore our exquisite gourmet creations—crafted to inspire your culinary flair and elevate every dish with rich flavors and premium quality."    },
  ];

  const handleCategoryClick = (feature) => {
    navigate(feature.link);
  };

  return (
    <section className={styles.featuresSection}>
      <div className={styles.heading}>
        <h3 className={styles.scriptHeading}>
          Crafted with Passion, Served with Delight
        </h3>
        <h2 className={styles.mainHeading}>Our Products</h2>
        <div className={styles.divider}>
          <div className={styles.line}></div>
          <span className={styles.icon}>
            <img
              src="/images/flower.webp"
              className={styles.featureIcon1}
              alt="divider"
            />
          </span>
          <div className={styles.line}></div>
        </div>
      </div>

      <div className={styles.featuresGrid}>
        {features.map((feature, index) => (
          <div
            key={index}
            className={styles.featureCard}
            onClick={() => handleCategoryClick(feature)}
            style={{ cursor: "pointer" }}
          >
            <img
              className={styles.featureImage}
              src={feature.image}
              alt={feature.title}
            />
            <span className={styles.featureTitle}>{feature.title}</span>
            <p className={styles.featureText}>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
