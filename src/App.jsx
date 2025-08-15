import "./styles/theme.css";
import "./styles/global.css";
import { ProductList } from "./components/ProductList";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { ProductAdmin } from "./components/ProductAdmin";
import { Header } from "./components/Header";
import { Route, Routes } from "react-router";
import { Cart } from "./components/Cart";
import { CartProvider } from "./service/CartContext";

export default function App() {
  return (
    <CartProvider>
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/productAdmin" element={<ProductAdmin />} />
      </Routes>
    </CartProvider>
  );
}
