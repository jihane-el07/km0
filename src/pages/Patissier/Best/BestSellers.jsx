import React, { useState, useEffect, useRef } from 'react';
import styles from './BestSellers.module.css';

const BestSellers = ({ addToCart }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const containerRef = useRef(null);

  const products = [
    { id: 1, name: 'Churros', quantity: '30', image: '/images/churros.jpg', price: '29,00' },
    { id: 2, name: 'Individual Waffle', quantity: '4', image: '/images/gaufre.jpg', price: '39,00' },
    { id: 3, name: 'Mini Chocolate Bread', quantity: '10', image: '/images/pain-chocolat.jpg', price: '46,00' },
    { id: 4, name: 'Plain Sandwich Bread 120g', quantity: '5', image: '/images/pain-sandwich.jpg', price: '15,00' },
    { id: 5, name: 'Mini Swiss Bread – 10 units 30g', quantity: '10', image: '/images/painswiss.jpg', price: '48,00' },
    { id: 6, name: 'Mini Moroccan Barley Bread 50g', quantity: '12', image: '/images/painmaroc.jpg', price: '26,00' },
  ];

  const nextSlide = () => {
    if (currentIndex < products.length - cardsPerView) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const container = containerRef.current.querySelector(`.${styles.productCard}`);
        if (container) {
          const cardW = container.offsetWidth + 16; // 16px for margin
          const viewportWidth = containerRef.current.offsetWidth;
          const visibleCards = Math.floor(viewportWidth / cardW);
          setCardWidth(cardW);
          setCardsPerView(Math.max(1, visibleCards)); // Ensure at least 1 card is visible
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const openProductDetails = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    document.body.style.overflow = 'hidden';
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
    document.body.style.overflow = 'auto';
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);

  const decrementQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const confirmAddToCart = () => {
    alert(`Added ${quantity} ${selectedProduct.name} to cart`);
    closeProductDetails();
  };

  return (
    <div className={styles.bestSellers}>
      <h3 className={styles.scriptHeading}>Exquisite Pâtisserie Moments</h3>
      <h2 className={styles.mainHeading}>Best Sellers</h2>
      <div className={styles.divider}>
        <div className={styles.line}></div>
        <span className={styles.icon}>
          <img src="/images/flower.webp" className={styles.featureIcon1} alt="divider" />
        </span>
        <div className={styles.line}></div>
      </div>

      <div className={styles.carouselWrapper} ref={containerRef}>
        <button 
          className={styles.navButton} 
          onClick={prevSlide} 
          disabled={currentIndex === 0}
          aria-label="Previous products"
        >
          &lt;
        </button>

        <div className={styles.carouselViewport}>
          <div
            className={styles.carouselTrack}
            style={{
              transform: `translateX(-${currentIndex * cardWidth}px)`,
              transition: 'transform 0.3s ease',
            }}
          >
            {products.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className={styles.productImage} 
                  loading="lazy"
                />
                <div className={styles.productInfo}>
                  <h3>{product.name}</h3>
                  <p className={styles.units}>{product.quantity} units</p>
                  <p className={styles.prix}>{product.price} DH</p>
                  <button 
                    className={styles.commande} 
                    onClick={() => openProductDetails(product)}
                    aria-label={`Add ${product.name} to cart`}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className={styles.navButton}
          onClick={nextSlide}
          disabled={currentIndex >= products.length - cardsPerView}
          aria-label="Next products"
        >
          &gt;
        </button>
      </div>

      {selectedProduct && (
        <div className={styles.productModalOverlay} onClick={closeProductDetails}>
          <div className={styles.productModal} onClick={(e) => e.stopPropagation()}>
            <button 
              className={styles.closeModal} 
              onClick={closeProductDetails}
              aria-label="Close product details"
            >
              ×
            </button>
            <div className={styles.productModalContent}>
              <div className={styles.productModalImage}>
                <img 
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  loading="lazy"
                />
              </div>
              <div className={styles.productModalDetails}>
                <h2 className={styles.productModalName}>{selectedProduct.name}</h2>
                <p className={styles.productModalPrice}>{selectedProduct.price} DH</p>
                <div className={styles.productModalDivider}></div>
                <p className={styles.productModalDescription}>{selectedProduct.name}</p>

                <div className={styles.productModalActions}>
                  <div className={styles.quantitySelector}>
                    <button 
                      className={styles.quantityBtn} 
                      onClick={decrementQuantity}
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className={styles.quantityValue}>{quantity}</span>
                    <button 
                      className={styles.quantityBtn} 
                      onClick={incrementQuantity}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* <button 
                    className={styles.addToCartBtn} 
                    onClick={confirmAddToCart}
                    aria-label="Add to cart"
                  >
                    <span className={styles.cartIcon}>🛒</span>
                    Ajouter au panier
                  </button> */}
            <button
              className={styles.addToCartBtn}
              onClick={() => {
                addToCart(selectedProduct.price, quantity);
                closeProductDetails();
              }}
            >
              Ajouter au panier
            </button>


                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BestSellers;