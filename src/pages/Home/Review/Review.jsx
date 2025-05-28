import React from 'react';
import styles from './Review.module.css';
import { Star, Quote } from 'lucide-react';

const Review = () => {
 const reviews = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Food Critic',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    rating: 5,
    text: 'The culinary experience was absolutely divine. Every dish was a masterpiece of flavors and presentation. I was particularly impressed with the attention to detail and the use of seasonal ingredients.',
    date: 'May 15, 2023'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Food Blogger',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 4,
    text: 'A truly memorable dining experience. The fusion of traditional and modern techniques created dishes that were both familiar and surprising. The service was impeccable and the ambiance perfect.',
    date: 'April 22, 2023'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Regular Customer',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
    text: "I've been coming here for years and the quality has never wavered. The new seasonal menu is their best yet. The desserts are worth saving room for - especially the chocolate soufflé!",
    date: 'June 3, 2023'
  },
  {
    id: 4,
    name: 'Olivia Brown',
    role: 'Travel Blogger',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    rating: 4,
    text: 'The staff was friendly and the ambiance cozy. I appreciated the vegetarian options and the open kitchen concept. Will definitely recommend it to my readers!',
    date: 'May 30, 2023'
  },
  {
    id: 5,
    name: 'David Lee',
    role: 'Chef & Reviewer',
    image: 'https://randomuser.me/api/portraits/men/15.jpg',
    rating: 5,
    text: 'As a chef, I admire the finesse and precision in each dish. The flavors were balanced and inventive. A must-visit for anyone who loves fine dining.',
    date: 'March 12, 2023'
  },
  {
    id: 6,
    name: 'Nina Patel',
    role: 'Local Foodie',
    image: 'https://randomuser.me/api/portraits/women/27.jpg',
    rating: 5,
    text: 'The ambiance, the service, the food — everything was spot-on. I’ll be bringing my family here for our next celebration!',
    date: 'June 1, 2023'
  }
];


  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star 
          key={i} 
          size={16} 
          className={i < rating ? styles.starFilled : styles.starEmpty} 
        />
      );
    }
    return stars;
  };

  return (
    <>
        <div className={styles.heading}>
            <h3 className={styles.scriptHeading}>What Our Customers Say</h3>
            <h2 className={styles.mainHeading}>Real Reviews from Real People</h2>
            <div className={styles.divider2}>
                <div className={styles.line}></div>
                <span className={styles.icon2}><img src="/images/flower.webp" className={styles.featureIcon1}/></span>
                <div className={styles.line}></div>
            </div>
        </div>
        <div className={styles.sliderWrapper}>
            <div className={styles.sliderTrack}>
                {[...reviews, ...reviews].map((review, index) => (
                <div key={index} className={styles.reviewCard}>
                    <div className={styles.quoteIcon}>
                    <Quote size={32} />
                    </div>

                    <div className={styles.reviewContent}>
                    <div className={styles.reviewText}>{review.text}</div>
                    <div className={styles.ratingContainer}>
                        <div className={styles.stars}>{renderStars(review.rating)}</div>
                        <div className={styles.date}>{review.date}</div>
                    </div>
                    </div>

                    <div className={styles.reviewerInfo}>
                    <div className={styles.reviewerImage}>
                        <img
                        src={review.image || '/placeholder.svg?height=60&width=60'}
                        alt={review.name}
                        />
                    </div>
                    <div className={styles.reviewerDetails}>
                        <h3 className={styles.reviewerName}>{review.name}</h3>
                        <p className={styles.reviewerRole}>{review.role}</p>
                    </div>
                    </div>
                </div>
                ))}
            </div>
        </div>
    </>
  );
};

export default Review;