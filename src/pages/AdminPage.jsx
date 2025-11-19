import React, { useEffect, useState, useContext } from "react";
import { supabase } from "../utils/supabase";
import { SessionContext } from "../context/SessionContext";


export default function AdminPage() {
const { session } = useContext(SessionContext);
const user = session?.user;
const isAdmin = user?.user_metadata?.admin === true;


const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);


useEffect(() => {
async function loadProducts() {
const { data, error } = await supabase.from("product_2v").select();
if (error) return console.error(error);
setProducts(data || []);
setLoading(false);
}
loadProducts();
}, []);


async function createProduct(newProduct) {
const { data, error } = await supabase.from("product_2v").insert(newProduct).select();
if (error) return console.error(error);
setProducts((p) => [...p, ...data]);
}


async function updateProduct(id, patch) {
const { data, error } = await supabase.from("product_2v").update(patch).eq("id", id).select();
if (error) return console.error(error);
setProducts((prev) => prev.map((x) => (x.id === id ? data[0] : x)));
}


async function deleteProduct(id) {
const { error } = await supabase.from("product_2v").delete().eq("id", id);
if (error) return console.error(error);
setProducts((prev) => prev.filter((p) => p.id !== id));
}


if (!isAdmin) return <div><h2>Acesso negado</h2></div>;


if (loading) return <div>Carregando...</div>;


return (
<div>
<h1>Painel Administrativo</h1>
<p>Você pode criar, editar e remover produtos.</p>


<ul>
{products.map((p) => (
<li key={p.id}>
<strong>{p.title}</strong> — {p.price}
<button onClick={() => deleteProduct(p.id)}>Excluir</button>
<button onClick={() => updateProduct(p.id, { price: p.price + 1 })}>+1 preço</button>
</li>
))}
</ul>


{/* Implementar formulário de criação conforme precisar */}
</div>
);
}