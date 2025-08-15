import { useState } from "react";
import styles from "./Register.module.css";
import { useNavigate, Link } from "react-router";
import { User, Mail, Lock } from "lucide-react";

export function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    alert("Usuário cadastrado com sucesso!");
    navigate("/login");
  };

  return (
    <div className={styles.container}>
      <h2>Cadastro</h2>
      <form onSubmit={handleRegister}>
        <label>Seu nome</label>
        <div className={styles.inputGroup}>
          <User className={styles.icon} />
          <input
            type="text"
            placeholder="Emilly Lima"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <label>Seu e-mail</label>
        <div className={styles.inputGroup}>
          <Mail className={styles.icon} />
          <input
            type="email"
            placeholder="emillylima@gmail.com"
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
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <button type="submit">Cadastrar</button>

        <div className={styles.footer}>
          <span>Já tem conta?</span>
          <Link to="/login">Entrar</Link>
        </div>
      </form>
    </div>
  );
}
