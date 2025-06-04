import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import styles from './BestSellers.module.css';

const BestSellers = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://km0-api.vercel.app/patisserie');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();

        // Group products by category and take one from each
        const categories = {};
        data.forEach(product => {
          if (!categories[product.categorie]) {
            categories[product.categorie] = product;
          }
        });

        // Convert to array and sort by category
        const bestSellers = Object.values(categories).sort((a, b) =>
          a.categorie.localeCompare(b.categorie)
        );

        setProducts(bestSellers);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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

  const handleAddToCart = (product) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setShowLoginModal(true);
      return;
    }
    openProductDetails(product);
  };

  if (loading) {
    return <div className={styles.loading}>Loading best sellers...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

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

      <div className={styles.productsGrid}>
        {products.map((product) => (
          <div key={product._id} className={styles.productCard}>
            <img
              src={product.image}
              alt={product.name}
              className={styles.productImage}
              loading="lazy"
            />
            <div className={styles.productInfo}>
              <h3>{product.name}</h3>
              <p className={styles.units}>{product.quantity}</p>
              <p className={styles.prix}>{product.price.toString()} DH</p>
              <button
                className={styles.commande}
                onClick={() => handleAddToCart(product)}
                aria-label={`Add ${product.name} to cart`}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className={styles.modalOverlay} onClick={() => setShowLoginModal(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <button className={styles.closeModal} onClick={() => setShowLoginModal(false)}>×</button>
            <div className={styles.modalBody}>
              <h2>Login Required</h2>
              <p>Please login to add items to your cart.</p>
              <Link to="/login" className={styles.loginButton} onClick={() => setShowLoginModal(false)}>
                Go to Login
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Product Details Modal */}
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
                <p className={styles.productModalPrice}>{selectedProduct.price.toString()} DH</p>
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

                  <button
                    className={styles.addToCartBtn}
                    onClick={() => {
                      const productToAdd = {
                        ...selectedProduct,
                        price: selectedProduct.price.toString()
                      };
                      addToCart(productToAdd, quantity);
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