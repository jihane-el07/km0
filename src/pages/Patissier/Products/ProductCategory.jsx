import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ProductCategory.module.css";
import products from "../../../data/products.json";

const ProductCategory = ({ addToCart }) => {
  const [viewMode, setViewMode] = useState("grid");
  const { category } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

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

  useEffect(() => {
    if (category) {
      const matched = products.filter(
        (product) => product.categorie.toLowerCase() === category.toLowerCase()
      );
      setFilteredProducts(matched);
    }
  }, [category]);

  const heroImage = filteredProducts[0]?.imageH || "/images/fallback.jpg";

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
            <div key={product.id} className={styles.productCard}>
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
                  onClick={() => openProductDetails(product)}
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
                    addToCart(selectedProduct, quantity); // pass entire product, not just price
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
