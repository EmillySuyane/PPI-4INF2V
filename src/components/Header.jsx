import styles from "./Header.module.css";
import { Link } from "react-router";
import { ShoppingBasket } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "../service/CartContext";

export function Header() {
  const { cart } = useContext(CartContext);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((total, product) => total + product.price * product.quantity, 0);

  return (
    <header className={styles.header}>
      <Link to="/"><h1>TRJ Megastore</h1></Link>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <Link to="/cart" style={{ position: "relative" }}>
          <ShoppingBasket size={24} />
          {totalItems > 0 && (
            <span style={{
              position: "absolute",
              top: "-10px",
              right: "-10px",
              background: "orange",
              color: "white",
              borderRadius: "50%",
              padding: "2px 6px",
              fontSize: "12px"
            }}>
              {totalItems}
            </span>
          )}
        </Link>
        <p>Total $: {totalPrice.toFixed(2)}</p>
      </div>
    </header>
  );
}
