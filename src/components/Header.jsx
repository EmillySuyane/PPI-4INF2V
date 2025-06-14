import styles from "./Header.module.css";
import { Github, Instagram, Phone } from "lucide-react";
export function Header() {
  // Desestruturação de props
  return (
    <header className={styles.header1}>
      <h1>Foco, Força, Fé</h1>
    </header>
  );
}