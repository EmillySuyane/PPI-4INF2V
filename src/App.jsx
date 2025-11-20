import "./styles/theme.css";
import "./styles/global.css";
import { Header } from "./components/Header";
import { ProductList } from "./components/ProductList";
import { Cart } from "./components/Cart";
import { Login } from "./components/Login";
import { User } from "./components/User";
import { Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

export default function App() {
  return (
    // React Fragment
    <>
      <CartProvider>
        <Header />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/signin" element={<Login value={"signin"} />} />
          <Route path="/register" element={<Login value={"register"} />} />
          <Route path="/user" element={<User />} />
          <Route path="/cart" element={<Cart />} />
          {/* Add more routes as needed */}
        </Routes>
      </CartProvider>
    </>
  );
}