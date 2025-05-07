import { div } from "framer-motion/client";
import styles from "./features-section.module.css"
import { Utensils, Wine, Fish, ChefHat, Drumstick, Soup,HopOff  } from "lucide-react"

export default function FeaturesSection() {
  const features =[
    {
      icon: <Utensils className={styles.featureIcon} />,
      title: "High Quality Foods",
      description:
        "We serve dishes made with fresh, seasonal, and locally sourced ingredients, ensuring top quality and authentic flavors in every bite.",
    },
    {
      icon: <Wine className={styles.featureIcon} />,
      title: "Inspiring Recipes",
      description:
        "Our chefs craft creative recipes that celebrate the rich culinary heritage of our region, blending tradition with innovation.",
    },
    {
      icon: <Fish className={styles.featureIcon} />,
      title: "Salutary Meals",
      description:
        "Our menu promotes well-being with balanced meals prepared using wholesome, natural, and chemical-free ingredients.",
    },
    {
      icon: <ChefHat className={styles.featureIcon} />,
      title: "Veteran Staff",
      description:
        "Our experienced team combines passion and skill to offer you impeccable service and culinary excellence in every dish.",
    },
    {
      icon: <Drumstick className={styles.featureIcon} />,
      title: "Pristine Ingredients",
      description:
        "We partner with local farmers and producers to source the finest ingredients, supporting sustainability and transparency.",
    },
    {
      icon: <Soup className={styles.featureIcon} />,
      title: "Express Delivery",
      description:
        "Enjoy the KM0 experience at home with our fast, eco-conscious delivery service that brings fresh meals straight to your door.",
    },
  ];
  

  return (
    <section className={styles.featuresSection}>
      <div className={styles.heading}>
        <h3 className={styles.scriptHeading}>For your comfort</h3>
        <h2 className={styles.mainHeading}>Stunning Things</h2>
        <div className={styles.divider}>
          <div className={styles.line}></div>
          <span className={styles.icon}><img src="/images/flower.webp" className={styles.featureIcon1}/></span>
          <div className={styles.line}></div>
        </div>
      </div>
      <div className={styles.featuresGrid}>
        {features.map((feature, index) => (
          <div className={styles.mfrd}>
            <div key={index} className={styles.featureCard}>
              {feature.icon}
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureText}>{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
