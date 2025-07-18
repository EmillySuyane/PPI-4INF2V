import { Link } from "react-router";
import styles from "./Header.module.css";
import { ShoppingBasket } from "lucide-react";

export function Header({ cart }) {
  return (
    <header className={styles.header}>
      <Link to="/"><h1>TRJ Megastore</h1></Link>
      <div>
        <Link to="/cart"><ShoppingBasket size={24} /></Link>
        <p>
          Total $: {cart.reduce((total, product) => total + product.price, 0).toFixed(2)}
        </p>
      </div>
    </header>
  );
}