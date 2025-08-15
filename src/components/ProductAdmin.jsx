// ProductAdmin.jsx
import { useState, useContext } from "react";
import { CartContext } from "../service/CartContext";
import styles from "./ProductAdmin.module.css";

export function ProductAdmin() {
  const { products, setProducts } = useContext(CartContext);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    thumbnail: "",
  });

  const [editingProduct, setEditingProduct] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    if (editingProduct) {
      // Atualizar produto
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct
            ? { ...formData, id: editingProduct, price: Number(formData.price) }
            : p
        )
      );
      setEditingProduct(null);
    } else {
      // Adicionar novo produto
      const newProduct = {
        ...formData,
        id: Date.now(),
        price: Number(formData.price),
      };
      setProducts((prev) => [...prev, newProduct]);
    }

    setFormData({ title: "", description: "", price: "", thumbnail: "" });
  }

  function handleEdit(product) {
    setEditingProduct(product.id);
    setFormData({
      title: product.title,
      description: product.description,
      price: product.price,
      thumbnail: product.thumbnail,
    });
  }

  function handleDelete(id) {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className={styles.container}>
      <h2>Administração de Produtos</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Título"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Descrição"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />
        <input
          type="number"
          placeholder="Preço"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Thumbnail URL"
          value={formData.thumbnail}
          onChange={(e) =>
            setFormData({ ...formData, thumbnail: e.target.value })
          }
          required
        />
        <button type="submit">
          {editingProduct ? "Salvar Alterações" : "Adicionar Produto"}
        </button>
      </form>

      <div className={styles.productGrid}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <div className={styles.actions}>
              <button onClick={() => handleEdit(product)}>Editar</button>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(product.id)}
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
