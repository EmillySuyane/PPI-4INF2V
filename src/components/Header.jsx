import styles from "./Header.module.css";
import { ShoppingBasket, SquareUserRound, Package } from "lucide-react";
import { Link } from "react-router";
import { useContext } from "react";
import { CartContext } from "../service/CartContext";

export function Header() {
  const { cart } = useContext(CartContext);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className={styles.header1}>
      <Link to="/" className={styles.title}>TRJ Megastore</Link>
      <div className={styles.cart}>
        <Link to="/login"><SquareUserRound /></Link>
        <Link to="/productAdmin"><Package /></Link>
        <Link to="/cart"><ShoppingBasket /></Link>
        { totalItems === 0 ? <h5></h5> : <p>{totalItems}</p> }
      </div>
    </header>
  );
}
