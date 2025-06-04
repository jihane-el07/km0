import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import styles from "./ProductCategory.module.css";

const ProductCategory = ({ addToCart }) => {
  const [viewMode, setViewMode] = useState("grid");
  const { category } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

        // Filter products by category
        const matched = data.filter(
          (product) => product.categorie.toLowerCase() === category.toLowerCase()
        );
        setFilteredProducts(matched);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchProducts();
    }
  }, [category]);

  const openProductDetails = (product) => {
    setSelectedProduct(product);
    setQuantity(1);
    document.body.style.overflow = "hidden";
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
    document.body.style.overflow = "auto";
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const heroImage = filteredProducts[0]?.imageH || "/images/fallback.jpg";

  const handleAddToCart = (product) => {
    const token = localStorage.getItem('token');
    if (!token) {
      setShowLoginModal(true);
      return;
    }
    openProductDetails(product);
  };

  if (loading) {
    return <div className={styles.loading}>Loading products...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.productGrid}>
      <div className={styles.hero}>
        <img src={heroImage} alt={category} className={styles.heroImage} />
        <div className={styles.heroOverlay}>
          <h1 className={styles.heroTitle}>{category}</h1>
        </div>
      </div>
      <div className={`${styles.products} ${styles[viewMode]}`}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id} className={styles.productCard}>
              <div className={styles.productImage}>
                <img src={product.image} alt={product.name} />
              </div>
              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productUnits}>{product.quantity}</p>
                <div className={styles.productPrice}>
                  <span className={styles.price}>{product.price}</span>
                  <span className={styles.currency}>DH</span>
                </div>
                <button
                  className={styles.commande}
                  onClick={() => handleAddToCart(product)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
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
        <div
          className={styles.productModalOverlay}
          onClick={closeProductDetails}
        >
          <div
            className={styles.productModal}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.closeModal} onClick={closeProductDetails}>
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
                <h2 className={styles.productModalName}>
                  {selectedProduct.name}
                </h2>
                <p className={styles.productModalPrice}>
                  {selectedProduct.price} DH
                </p>
                <div className={styles.productModalDivider}></div>
                <p className={styles.productModalDescription}>
                  {selectedProduct.name}
                </p>
                <div className={styles.productModalActions}>
                  <div className={styles.quantitySelector}>
                    <button
                      className={styles.quantityBtn}
                      onClick={decrementQuantity}
                    >
                      -
                    </button>
                    <span className={styles.quantityValue}>{quantity}</span>
                    <button
                      className={styles.quantityBtn}
                      onClick={incrementQuantity}
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
                    Add to cart
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

export default ProductCategory;
