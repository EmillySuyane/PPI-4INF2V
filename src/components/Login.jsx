import { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate, Link } from "react-router";
import { User, Lock } from "lucide-react";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [manterLogado, setManterLogado] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email && senha) {
      alert("Login realizado com sucesso!");
      navigate("/productList");
    } else {
      alert("Preencha todos os campos!");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Seu e-mail</label>
        <div className={styles.inputGroup}>
          <User className={styles.icon} />
          <input
            type="email"
            placeholder="trjmegastore@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <label>Sua senha</label>
        <div className={styles.inputGroup}>
          <Lock className={styles.icon} />
          <input
            type="password"
            placeholder="1234"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <div className={styles.checkbox}>
          <input
            type="checkbox"
            checked={manterLogado}
            onChange={(e) => setManterLogado(e.target.checked)}
          />
          <span>Lembrar senha</span>
        </div>

        <button type="submit">Entrar</button>

        <div className={styles.footer}>
          <span>Ainda não tem conta?</span>
          <Link to="/register">Cadastre-se</Link>
        </div>
      </form>
    </div>
  );
}
