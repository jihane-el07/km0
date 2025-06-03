
import { useState } from "react"
import styles from "./Cart.module.css"

const Cart = ({ cartItems = [] }) => {
  const [isCartOpen, setIsCartOpen] = useState(true);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className={styles.container}>
      {isCartOpen && (
        <div className={styles.cartOverlay}>
          <div className={styles.cartModal}>
            <div className={styles.cartHeader}>
              <h2>Shopping Cart</h2>
              <button className={styles.closeButton} onClick={toggleCart}>
                ✕
              </button>
            </div>

            <div className={styles.cartContent}>
              {cartItems.length > 0 ? (
                cartItems.map((item, index) => (
                  <div key={index} className={styles.cartItem}>
                    <img src={item.image} alt={item.name} width={50} />
                    <div>
                      <p>{item.name}</p>
                      <p>{item.price} DH</p>
                    </div>
                  </div>
                ))
              ) : (
                <div>
                  <div className={styles.emptyCartIcon}>
                    <div className={styles.shoppingBag}>
                      <span className={styles.smileyFace}>😊</span>
                    </div>
                  </div>
                  <p className={styles.emptyCartText}>Aucun produit dans le panier.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {!isCartOpen && (
        <button className={styles.cartToggle} onClick={toggleCart}>
          🛒
        </button>
      )}
    </div>
  );
};
export default Cart;