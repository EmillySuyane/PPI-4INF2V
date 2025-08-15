import { useState, useEffect, createContext } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  
  const category = "beauty"; 
  const limit = 10;
  const apiUrl = `https://dummyjson.com/products/category/${category}?limit=${limit}&select=id,thumbnail,title,price,description`;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const [cart, setCart] = useState([]);

  function addToCart(product) {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      updateQtyCart(product.id, existingProduct.quantity + 1);
    } else {
      setCart((prev) => [...prev, { ...product, quantity: 1 }]);
    }
  }

  function updateQtyCart(productId, quantity) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }

  function removeFromCart(productId) {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  }

  function clearCart() {
    setCart([]);
  }

  const context = {
    products,  
    setProducts,
    loading,
    error,
    cart,
    addToCart,
    updateQtyCart,
    removeFromCart,
    clearCart,
  };

  return (
    <CartContext.Provider value={context}>
      {children}
    </CartContext.Provider>
  );
}
