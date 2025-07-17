import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import styles from "./ProductList.module.css";

export function ProductList() {
  const category = "smartphones"; // You can change this to any valid category
  const limit = 12;
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

    setTimeout(fetchProducts, 2000);
  }, [apiUrl]);

  return (
    <div className={styles.container}>
      <h1>TRJ Megastore</h1>

      {}
      <div className={styles.grid}>
        {products.map((product) => (
          <div key={product.id} className={styles.card}>
            <img
              src={product.thumbnail}
              alt={product.title}
              className={styles.image}
            />

            <h2 className={styles.title}>{product.title}</h2>

            <p className={styles.description}>{product.description}</p>

            <p className={styles.price}>${product.price}</p>

            {}
            <button className={styles.button}>Adicionar ao carrinho</button>
          </div>
        ))}
      </div>

      {}
      {loading && (
        <div>
          <CircularProgress
            thickness={5}
            style={{ margin: "2rem auto", display: "block" }}
            sx={{ color: "#6c3bb8" }}
          />
          <p>Loading products...</p>
        </div>
      )}

      {error && <p>Error loading products: {error.message}</p>}
    </div>
  );
}
