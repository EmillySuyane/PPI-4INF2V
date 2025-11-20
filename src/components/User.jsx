import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import styles from "./User.module.css";

export function User() {
  const { session, handleSignOut, products, createProduct, updateProduct, deleteProduct, refreshSession } = useContext(CartContext);
  const [newProduct, setNewProduct] = useState({ title: "", description: "", price: 0, thumbnail: "" });
  const [editingId, setEditingId] = useState(null);
  const [editingValues, setEditingValues] = useState({});

  async function handleAdd(e) {
    e.preventDefault();
    try {
      await createProduct(newProduct);
      setNewProduct({ title: "", description: "", price: 0, thumbnail: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to create product");
    }
  }

  async function handleSaveEdit(id) {
    try {
      await updateProduct(id, editingValues);
      setEditingId(null);
      setEditingValues({});
    } catch (err) {
      console.error(err);
      alert("Failed to update product");
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this product?")) return;
    try {
      await deleteProduct(id);
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  }

  return (
    <div>
      {session ? (
        <div className={styles.container}>
          {session.user.user_metadata.admin ? (
            <div>
              <h1>Admin: Manage Products</h1>
              <form onSubmit={handleAdd} className={styles.form}>
                <input
                  placeholder="Title"
                  value={newProduct.title}
                  onChange={(e) => setNewProduct((s) => ({ ...s, title: e.target.value }))}
                />
                <input
                  placeholder="Thumbnail URL"
                  value={newProduct.thumbnail}
                  onChange={(e) => setNewProduct((s) => ({ ...s, thumbnail: e.target.value }))}
                />
                <input
                  placeholder="Price"
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct((s) => ({ ...s, price: Number(e.target.value) }))}
                />
                <textarea
                  placeholder="Description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct((s) => ({ ...s, description: e.target.value }))}
                />
                <button type="submit" className={styles.button}>Add Product</button>
              </form>

              <div className={styles.productAdminList}>
                {products.map((p) => (
                  <div key={p.id} className={styles.productAdminItem}>
                    {editingId === p.id ? (
                      <div>
                        <input
                          value={editingValues.title ?? p.title}
                          onChange={(e) => setEditingValues((s) => ({ ...s, title: e.target.value }))}
                        />
                        <input
                          value={editingValues.thumbnail ?? p.thumbnail}
                          onChange={(e) => setEditingValues((s) => ({ ...s, thumbnail: e.target.value }))}
                        />
                        <input
                          type="number"
                          value={editingValues.price ?? p.price}
                          onChange={(e) => setEditingValues((s) => ({ ...s, price: Number(e.target.value) }))}
                        />
                        <textarea
                          value={editingValues.description ?? p.description}
                          onChange={(e) => setEditingValues((s) => ({ ...s, description: e.target.value }))}
                        />
                        <button onClick={() => handleSaveEdit(p.id)} className={styles.button}>Save</button>
                        <button onClick={() => { setEditingId(null); setEditingValues({}); }} className={styles.button}>Cancel</button>
                      </div>
                    ) : (
                      <div>
                        <img src={p.thumbnail} alt={p.title} style={{ width: 80 }} />
                        <h3>{p.title}</h3>
                        <p>{p.description}</p>
                        <p>${p.price}</p>
                        <button onClick={() => { setEditingId(p.id); setEditingValues(p); }} className={styles.button}>Edit</button>
                        <button onClick={() => handleDelete(p.id)} className={styles.button}>Delete</button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <h1>User Account</h1>
          )}

          <div className={styles.userInfo}>
            <p>
              <strong>Username:</strong> {session.user.user_metadata.username}
            </p>
            <p>
              <strong>Email:</strong> {session.user.email}
            </p>
            <p>
              <strong>ID:</strong> {session.user.id}
            </p>
          </div>
          <div className={styles.actions}>
            <button
              className={styles.button}
              onClick={async () => {
                try {
                  const user = await refreshSession();
                  alert(`Session refreshed. admin=${user?.user_metadata?.admin}`);
                } catch (err) {
                  alert("Failed to refresh session: " + (err.message || err));
                }
              }}
            >
              Refresh Session
            </button>

            <button className={styles.button + " secondary"} onClick={handleSignOut}>
              SIGN OUT
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
          <h1>User not signed in!</h1>
        </div>
      )}
    </div>
  );
}