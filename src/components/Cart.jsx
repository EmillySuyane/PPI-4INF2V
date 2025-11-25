import styles from "./Cart.module.css";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export function Cart() {
  const { cart, updateQtyCart, clearCart } = useContext(CartContext);

  const subtotal = cart.reduce(
    (sum, p) => sum + p.price * (p.quantity || 0),
    0
  );

  return (
    <div className={styles.cart}>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className={styles.list}>
            {cart.map((product) => (
              <li key={product.id} className={styles.cartItem}>
                <img src={product.thumbnail} alt={product.title} />
                <div className={styles.itemInfo}>
                  <h3>{product.title}</h3>
                  <p className={styles.price}>${product.price.toFixed(2)}</p>
                </div>

                <div className={styles.quantity}>
                  <button
                    onClick={() => updateQtyCart(product.id, product.quantity - 1)}
                  >
                    -
                  </button>
                  <span className={styles.qty}>{product.quantity}</span>
                  <button onClick={() => updateQtyCart(product.id, product.quantity + 1)}>
                    +
                  </button>
                </div>

                <div className={styles.itemActions}>
                  <button className={styles.remove} onClick={() => updateQtyCart(product.id, 0)}>
                    Remover
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className={styles.summary}>
            <p>Subtotal: ${subtotal.toFixed(2)}</p>
            <div className={styles.summaryActions}>
              <button className={styles.clear} onClick={clearCart}>
                Limpar Carrinho
              </button>
              <Link to="/" className={styles.checkout}>
                Finalizar Compra
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}