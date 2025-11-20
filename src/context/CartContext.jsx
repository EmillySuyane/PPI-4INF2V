import { useState, useEffect, createContext } from "react";
import { supabase } from "../utils/supabase";

export const CartContext = createContext({
  // Products and loading/error states
  products: [],
  loading: false,
  error: null,
  // Cart management
  cart: [],
  addToCart: () => {},
  updateQtyCart: () => {},
  clearCart: () => {},
  // User management
  session: null,
  sessionLoading: false,
  sessionMessage: null,
  sessionError: null,
  handleSignUp: () => {},
  handleSignIn: () => {},
  handleSignOut: () => {},
});

export function CartProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProductsSupabase() {
      const { data, error } = await supabase.from("product").select();
      if (error) {
        setError(`Fetching products failed! ${error}`);
      } else {
        setProducts(data);
      }
      setLoading(false);
    }
    fetchProductsSupabase();
    //   async function fetchProductsAPI() {
    //     // Fetch products from the API
    //     var category = "beauty";
    //     var limit = 12;
    //     var apiUrl = `https://dummyjson.com/products/category/${category}?limit=${limit}&select=id,thumbnail,title,price,description`;

    //     try {
    //       const response = await fetch(apiUrl);
    //       const data = await response.json();
    //       setProducts(data.products);
    //     } catch (error) {
    //       setError(error);
    //     } finally {
    //       setLoading(false);
    //     }
    //   }
    //   setTimeout(() => {
    //     fetchProductsAPI();
    //   }, 100);
  }, []);

  // Cart State Management
  // Initialize cart from localStorage so items persist across reloads
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem("ppi_cart");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.warn("Failed to parse cart from localStorage", e);
      return [];
    }
  });

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("ppi_cart", JSON.stringify(cart));
    } catch (e) {
      console.warn("Failed to save cart to localStorage", e);
    }
  }, [cart]);

  // supabase.from("cart").select("*").eq("user_id", session.user.id)

  function addToCart(product) {
    // Check if the product is already in the cart
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      // If it exists, update the quantity
      updateQtyCart(product.id, existingProduct.quantity + 1);
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  }

  function updateQtyCart(productId, quantity) {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId ? { ...item, quantity: quantity } : item
        )
        // remove items with non-positive quantities
        .filter((item) => item.quantity > 0)
    );
  }

  function clearCart() {
    setCart([]);
    try {
      localStorage.removeItem("ppi_cart");
    } catch (e) {
      console.warn("Failed to remove cart from localStorage", e);
    }
  }

  // Product CRUD for admin
  async function createProduct(product) {
    try {
      const { data, error } = await supabase.from("product").insert(product).select();
      if (error) throw error;
      setProducts((prev) => [...prev, ...data]);
      return data;
    } catch (err) {
      console.error("createProduct error", err);
      throw err;
    }
  }

  async function updateProduct(productId, updates) {
    try {
      const { data, error } = await supabase
        .from("product")
        .update(updates)
        .eq("id", productId)
        .select();
      if (error) throw error;
      setProducts((prev) => prev.map((p) => (p.id === productId ? data[0] : p)));
      return data[0];
    } catch (err) {
      console.error("updateProduct error", err);
      throw err;
    }
  }

  async function deleteProduct(productId) {
    try {
      const { error } = await supabase.from("product").delete().eq("id", productId);
      if (error) throw error;
      setProducts((prev) => prev.filter((p) => p.id !== productId));
      return true;
    } catch (err) {
      console.error("deleteProduct error", err);
      throw err;
    }
  }

  // User Session Management
  const [session, setSession] = useState(null);
  const [sessionLoading, setSessionLoading] = useState(false);
  const [sessionMessage, setSessionMessage] = useState(null);
  const [sessionError, setSessionError] = useState(null);

  useEffect(() => {
    // Verifica se tem sessão ativa no supabase
    async function getSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session || null);
      // ensure admin elevation if this is the special user
      maybeElevateAdmin(session);
    }

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session || null);
    });

    return() => subscription.unsubscribe();

  }, []);

  async function handleSignUp(email, password, username) {
    setSessionLoading(true);
    setSessionError(null);
    setSessionMessage(null);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username,
            admin: false,
          },
          emailRedirectTo: `${window.location.origin}/signin`,
        },
      });

      if (error) throw error;

      if (data?.user) {
        setSessionMessage(
          "Registration successful! Check your email to confirm your account."
        );
        window.location.href = "/signin";
      }
    } catch (error) {
      setSessionError(error.message);
    } finally {
      setSessionLoading(false);
    }
  }

  async function handleSignIn(email, password) {
    setSessionLoading(true);
    setSessionError(null);
    setSessionMessage(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.session) {
        // set initial session
        setSession(data.session);
        setSessionMessage("Sign in successful!");

        // Refresh user metadata (in case admin flag or other metadata changed)
        try {
          const { data: refreshed, error: refreshedErr } = await supabase.auth.getUser();
          if (refreshedErr) {
            console.warn("supabase.getUser after signIn failed", refreshedErr);
            // still attempt elevation with original session
            await maybeElevateAdmin(data.session);
          } else if (refreshed?.user) {
            // attach fresh user data and run elevation check
            setSession((prev) => ({ ...prev, user: refreshed.user }));
            await maybeElevateAdmin({ user: refreshed.user });
          } else {
            await maybeElevateAdmin(data.session);
          }
        } catch (e) {
          console.warn("Error refreshing user after signIn", e);
          await maybeElevateAdmin(data.session);
        }
      }
    } catch (error) {
      setSessionError(error.message);
    } finally {
      setSessionLoading(false);
    }
  }

  async function handleSignOut() {
    setSessionLoading(true);
    setSessionError(null);
    setSessionMessage(null);

    try {
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      // Clear session and local cart when signing out
      setSession(null);
      clearCart();
      window.location.href = "/";
    } catch (error) {
      console.log(error.message);
    } finally {
      setSessionLoading(false);
    }
  }

  // After sign in, optionally elevate a specific user to admin (equivalent to the SQL script)
  async function maybeElevateAdmin(sessionData) {
    try {
      const targetId = "85b7a3d9-01a4-4f45-8acd-8713b9334d6b";
      if (sessionData?.user?.id === targetId) {
        // update current user's metadata to include admin: true
        await supabase.auth.updateUser({ data: { admin: true } });
        // Refresh session user metadata
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setSession((prev) => ({ ...prev, user: user || prev.user }));
      }
    } catch (err) {
      console.warn("Failed to elevate admin", err);
    }
  }

  // Force-refresh user metadata from Supabase and update session state
  async function refreshSession() {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      const user = data?.user || null;
      setSession((prev) => ({ ...(prev || {}), user }));
      return user;
    } catch (err) {
      console.warn("refreshSession failed", err);
      throw err;
    }
  }

  const context = {
    //Products and loading/error states
    products: products,
    loading: loading,
    error: error,
    //Cart management
    cart: cart,
    addToCart: addToCart,
    updateQtyCart: updateQtyCart,
    clearCart: clearCart,
    // product CRUD
    createProduct: createProduct,
    updateProduct: updateProduct,
    deleteProduct: deleteProduct,
    // User management
    session: session,
    sessionLoading: sessionLoading,
    sessionMessage: sessionMessage,
    sessionError: sessionError,
    handleSignUp: handleSignUp,
    handleSignIn: handleSignIn,
    handleSignOut: handleSignOut,
    // admin helpers
    maybeElevateAdmin: maybeElevateAdmin,
    // debug / helpers
    refreshSession: refreshSession,
  };

  return (
    <CartContext.Provider value={context}>{children}</CartContext.Provider>
  );
}