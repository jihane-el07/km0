import styles from "./features-section.module.css"
import { Utensils, Wine, Fish, ChefHat, Drumstick, Soup,HopOff  } from "lucide-react"

export default function FeaturesSection() {
  const features = [
    {
      icon: <Utensils className={styles.featureIcon} />,
      title: "High Quality Foods",
      description:
        "Etiam feugiat eleifend est, sed luctus odio tempor vitae. Vivamus maximus scelerisque ipsum nec commodo.",
    },
    {
      icon: <Wine className={styles.featureIcon} />,
      title: "Inspiring Recipes",
      description:
        "Etiam feugiat eleifend est, sed luctus odio tempor vitae. Vivamus maximus scelerisque ipsum nec commodo.",
    },
    {
      icon: <Fish className={styles.featureIcon} />,
      title: "Salutary Meals",
      description:
        "Etiam feugiat eleifend est, sed luctus odio tempor vitae. Vivamus maximus scelerisque ipsum nec commodo.",
    },
    {
      icon: <ChefHat className={styles.featureIcon} />,
      title: "Veteran Staff",
      description:
        "Etiam feugiat eleifend est, sed luctus odio tempor vitae. Vivamus maximus scelerisque ipsum nec commodo.",
    },
    {
      icon: <Drumstick className={styles.featureIcon} />,
      title: "Pristine Ingredients",
      description:
        "Etiam feugiat eleifend est, sed luctus odio tempor vitae. Vivamus maximus scelerisque ipsum nec commodo.",
    },
    {
      icon: <Soup className={styles.featureIcon} />,
      title: "Express Delivery",
      description:
        "Etiam feugiat eleifend est, sed luctus odio tempor vitae. Vivamus maximus scelerisque ipsum nec commodo.",
    },
  ]

  return (
    <section className={styles.featuresSection}>
      <div className={styles.heading}>
        <h3 className={styles.scriptHeading}>For your comfort</h3>
        <h2 className={styles.mainHeading}>Stunning Things</h2>
        <div className={styles.divider}>
          <div className={styles.line}></div>
          <span className={styles.icon}><HopOff className={styles.featureIcon1}/></span>
          <div className={styles.line}></div>
        </div>
      </div>

      <div className={styles.featuresGrid}>
        {features.map((feature, index) => (
          <div key={index} className={styles.featureCard}>
            {feature.icon}
            <h3 className={styles.featureTitle}>{feature.title}</h3>
            <p className={styles.featureText}>{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
